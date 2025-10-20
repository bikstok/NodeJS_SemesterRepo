# REST API DESIGN

REST (Representational State Transfer) is a set of conventions for building APIs. When you follow REST principles, your API becomes predictable and easy to use.

## The Three REST Conventions We Follow

1. **Using the right HTTP verb** (GET, POST, PUT, PATCH, DELETE)
2. **Ordering** (structure your endpoints logically)
3. **Naming** (use nouns, plural form, map to collections)

## HTTP Verbs (Methods)

Each HTTP verb has a specific purpose:

| Verb | Purpose | Example |
|------|---------|---------|
| GET | Read/retrieve data | Get all gods or get one god |
| POST | Create new data | Create a new god |
| PUT | Replace entire resource | Replace all fields of a god |
| PATCH | Partial update | Update only some fields |
| DELETE | Remove data | Delete a god |

## RESTful Endpoint Structure

Follow this pattern: `/collection/:id`

- Collection name should be **plural nouns**
- Use the resource name, not actions
- Map endpoints to collections in your system

```javascript
// Good - RESTful
GET    /greekgods       // Get all gods
GET    /greekgods/:id   // Get one god
POST   /greekgods       // Create a god
PUT    /greekgods/:id   // Replace a god
PATCH  /greekgods/:id   // Update a god
DELETE /greekgods/:id   // Delete a god

// Bad - not RESTful
GET    /getAllGods      // Don't use verbs in URL
POST   /createGod       // Don't use verbs in URL
GET    /greekgod/:id    // Should be plural
DELETE /removeGreekGod/:id // Don't use verbs
```

## Complete CRUD API Example

Here's a full CRUDable REST API following all conventions:

```javascript
const express = require("express");
const app = express();

// Used to parse JSON bodies
app.use(express.json());

// Data
const greekGods = [
    { id: 1, name: "Zeus", power: "Thunder", isDemiGod: false },
    { id: 2, name: "Hera", power: "Marriage", isDemiGod: false },
    { id: 3, name: "Poseidon", power: "Sea", isDemiGod: false }
];

let nextGreekGodId = 4; // Track next ID

// READ all
app.get("/greekgods", (req, res) => {
    res.send({ data: greekGods });
});

// READ by id
app.get("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGod = greekGods.find((greekGod) => greekGod.id === providedGreekGodId);

    if (!foundGreekGod) {
        return res.status(404).send({ 
            errorMessage: `Greek God not found by id ${providedGreekGodId}` 
        });
    }
    
    res.send({ data: foundGreekGod });
});

// CREATE
app.post("/greekgods", (req, res) => {
    const providedGreekGodName = req.body.name;
    const providedIsDemiGod = req.body.isDemiGod;

    // Validation
    if (!providedGreekGodName || typeof providedGreekGodName !== "string") {
        return res.status(400).send({ 
            errorMessage: "Name is required and must be a string" 
        });
    }
    
    const createdGreekGod = {
        id: nextGreekGodId++, // Auto-increment ID
        name: providedGreekGodName,
        ...(providedIsDemiGod !== undefined && { isDemiGod: providedIsDemiGod })
    };

    greekGods.push(createdGreekGod);
    res.status(201).send({ data: createdGreekGod });
});

// UPDATE (replace all fields - PUT)
app.put("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGodIndex = greekGods.findIndex(
        (greekGod) => greekGod.id === providedGreekGodId
    );

    if (foundGreekGodIndex === -1) {
        return res.status(404).send({ 
            errorMessage: `Greek God not found by id ${providedGreekGodId}` 
        });
    }

    const providedGreekGodName = req.body.name;
    const providedIsDemiGod = req.body.isDemiGod;

    if (!providedGreekGodName || typeof providedGreekGodName !== "string") {
        return res.status(400).send({ 
            errorMessage: "Name is required and must be a string" 
        });
    }

    // Replace entire resource
    const updatedGreekGod = {
        id: providedGreekGodId,
        name: providedGreekGodName,
        ...(providedIsDemiGod !== undefined && { isDemiGod: providedIsDemiGod })
    };

    greekGods[foundGreekGodIndex] = updatedGreekGod;
    res.send({ data: updatedGreekGod });
});

// PARTIAL UPDATE (PATCH)
app.patch("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGod = greekGods.find(
        (greekGod) => greekGod.id === providedGreekGodId
    );

    if (!foundGreekGod) {
        return res.status(404).send({ 
            errorMessage: `Greek God not found by id ${providedGreekGodId}` 
        });
    }

    const providedGreekGodName = req.body.name;
    const providedIsDemiGod = req.body.isDemiGod;

    if (providedGreekGodName !== undefined && typeof providedGreekGodName !== "string") {
        return res.status(400).send({ 
            errorMessage: "Name must be a string" 
        });
    }

    // Only update provided fields
    if (providedGreekGodName !== undefined) {
        foundGreekGod.name = providedGreekGodName;
    }
    if (providedIsDemiGod !== undefined) {
        foundGreekGod.isDemiGod = providedIsDemiGod;
    }

    res.send({ data: foundGreekGod });
});

// DELETE
app.delete("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGodIndex = greekGods.findIndex(
        (greekGod) => greekGod.id === providedGreekGodId
    );

    if (foundGreekGodIndex === -1) {
        return res.status(404).send({ 
            errorMessage: `Greek God not found by id ${providedGreekGodId}` 
        });
    }

    const deletedGreekGod = greekGods.splice(foundGreekGodIndex, 1)[0];
    res.send({ data: deletedGreekGod });
});

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error:", error);
        return;
    }
    console.log(`Server running on port ${PORT}`);
});
```

## Status Codes

Use the right HTTP status codes:

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, PATCH, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid data from client |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Something broke on the server |

```javascript
// 200 - Default for successful requests
res.send({ data: foundGreekGod });

// 201 - Created
res.status(201).send({ data: createdGreekGod });

// 404 - Not found
res.status(404).send({ errorMessage: "Not found" });

// 400 - Bad request
res.status(400).send({ errorMessage: "Invalid data" });
```

## PUT vs PATCH

**PUT** replaces the entire resource. You must send all fields:

```javascript
// PUT /greekgods/1
{
    "name": "Zeus",
    "power": "Lightning",
    "isDemiGod": false
}
// Replaces ALL fields. Missing fields get removed/reset.
```

**PATCH** updates only the fields you send, not that widely used:

```javascript
// PATCH /greekgods/1
{
    "power": "Lightning"
}
// Only updates power. name and isDemiGod stay the same.
```

## Response Format

Keep responses consistent. Wrap data in an object:

```javascript
// Good - consistent structure
res.send({ data: greekGods });
res.send({ data: foundGreekGod });
res.send({ errorMessage: "Not found" });

// Avoid - inconsistent
res.send(greekGods);  // Sometimes array
res.send(foundGreekGod);  // Sometimes object
```

## Route Parameters vs Query Parameters

**Route parameters** (`:id`) - For required, resource-specific data:

```javascript
// GET /greekgods/5
app.get("/greekgods/:id", (req, res) => {
    const id = req.params.id;
    // ...
});
```

**Query parameters** (`?key=value`) - For optional filtering/sorting:

```javascript
// GET /greekgods?isDemiGod=true&sortBy=name
app.get("/greekgods", (req, res) => {
    const isDemiGod = req.query.isDemiGod;
    const sortBy = req.query.sortBy;
    // Filter results...
});
```

## Request Body Parsing

Always use `express.json()` middleware to parse JSON request bodies:

```javascript
app.use(express.json());

// Now you can access req.body in POST/PUT/PATCH
app.post("/greekgods", (req, res) => {
    const name = req.body.name;  // Works!
});
```

## Validation
You want to catch errors as early as possible!
Always validate user input before using it:

```javascript
// Check if required fields exist
if (!providedGreekGodName || typeof providedGreekGodName !== "string") {
    return res.status(400).send({ 
        errorMessage: "Name is required and must be a string" 
    });
}

// Check if resource exists
if (!foundGreekGod) {
    return res.status(404).send({ 
        errorMessage: `Greek God not found by id ${providedGreekGodId}` 
    });
}
```

## Finding Array Elements

Use the right array method:

```javascript
// .find() - returns the element or undefined
const foundGreekGod = greekGods.find((god) => god.id === providedGreekGodId);

// .findIndex() - returns the index or -1
const foundGreekGodIndex = greekGods.findIndex((god) => god.id === providedGreekGodId);

// Check if found
if (!foundGreekGod) { /* not found */ }
if (foundGreekGodIndex === -1) { /* not found */ }
```

## Spread Operator for Conditionals

Add properties conditionally using spread:

```javascript
const createdGreekGod = {
    id: nextGreekGodId++,
    name: providedGreekGodName,
    // Only add isDemiGod if it was provided
    ...(providedIsDemiGod !== undefined && { isDemiGod: providedIsDemiGod })
};

// If providedIsDemiGod is undefined, it won't be added to the object
```

## Richardson Maturity Model

This is a way to measure how RESTful your API is (levels 0-3). We focus on:

- **Level 1:** Using different URLs for different resources (`/greekgods`, `/users`)
- **Level 2:** Using HTTP verbs correctly (GET for read, POST for create, etc.)

## Testing Your API

Use tools like Postman to test:

```bash
# GET all
GET http://localhost:8080/greekgods

# GET one
GET http://localhost:8080/greekgods/1

# POST (create)
POST http://localhost:8080/greekgods
Body: { "name": "Hercules", "isDemiGod": true }

# PUT (replace)
PUT http://localhost:8080/greekgods/1
Body: { "name": "Zeus", "power": "Thunder" }

# PATCH (update)
PATCH http://localhost:8080/greekgods/1
Body: { "power": "Lightning" }

# DELETE
DELETE http://localhost:8080/greekgods/1
```

## Quick Checklist

 - Use plural nouns for collections (`/greekgods` not `/greekgod`)  
-  Use the right HTTP verb (GET, POST, PUT, PATCH, DELETE)  
 - Use route params for IDs (`:id`)  
 - Return consistent response format ({ data: ... })  
 - Use proper status codes (200, 201, 404, 400)  
-  Validate user input  
 - Parse JSON with `express.json()`  
 - Don't use verbs in URLs (`/greekgods` not `/getGreekGods`)  
 - Make IDs auto-increment for new resources