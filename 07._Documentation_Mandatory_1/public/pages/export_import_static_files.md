# EXPORT, IMPORT & STATIC FILES

## Serving Static Files in Express

Static files are files that don't change - HTML, CSS, JavaScript, images, etc. By default, Express doesn't serve any files to the client, which is good for security. You need to explicitly tell Express which files are public.

### The Easy Way

Use `express.static()` middleware:

```javascript
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000);
```

Now everything in the `public` folder is accessible:

```
project/
├── app.js
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── images/
│       └── logo.png
```
### Custom Path Prefix

Serve static files from a specific URL path:

```javascript
app.use('/static', express.static('public'));
```
### Why Not Serve Each File Manually?

You could do this, but it's tedious:

```javascript
const path = require('path');

app.get("/styles.css", (req, res) => {
    const stylesheet = path.join(__dirname, "public", "styles.css");
    res.sendFile(stylesheet);
});

// Imagine doing this for every file... no thanks
```

Just use `express.static()` instead.

## Including JavaScript in HTML

There are two ways to include JavaScript in your HTML:

### 1. Traditional Way (Global Scope)

```html
<script src="script.js"></script>
```

**Problems:**
- Everything is in global scope
- Name conflicts between files
- Hard to track dependencies
- Loads everything even if you only need one function
- Files load in order they appear

### 2. Modern Way (Modules)

### Enabling ES Modules

Added this to your package.json:

```js
"type": "module"

```


```html
<script type="module" src="script.js"></script>
```

**Benefits:**
- Each file has its own scope
- Use import/export syntax
- No global pollution
- Browser handles dependencies automatically
- Files load asynchronously
- Only load what you need

**Example:**

```javascript
// utils.js
export function greet(name) {
    return `Hello ${name}`;
}

export const MOMS = 0.25;
```

```javascript
// app.js
import { greet, PI } from './utils.js';

console.log(greet("Jakob")); // "Hello Jakob"
console.log(MOMS); // 0.25
```

```html
<!-- index.html -->
<script type="module" src="app.js"></script>
```

**Important:** With `type="module"`, you must include the `.js` file extension in imports.

## Default Export

You can have one default export per file:

```javascript
// math.js
export default function add(a, b) {
    return a + b;
}
```

```javascript
// app.js
import add from './math.js'; // No curly braces needed

console.log(add(2, 3)); // 5
```

## Redirection

Redirection is when you send users from one URL to another.

### Server-Side Redirect

The server responds with a redirect status code and the browser makes a new request:

```javascript
app.get("/old-page", (req, res) => {
    // maybe do logic in here
    res.redirect(301, "/new-page");
});
```

**Status codes:**
- `301` - Permanent redirect (SEO-friendly, browsers cache it)
- `302` - Temporary redirect (default if you don't specify)

**When to use:**
- After form submission (POST → redirect → GET pattern)
- Checking authentication (redirect to login if not logged in)
- URL changes (old URL → new URL)
- Good for SEO

**Example:**

```javascript
app.post("/login", (req, res) => {
    // Validate credentials
    if (isValidUser) {
        res.redirect("/dashboard");
    } else {
        res.redirect("/login?error=invalid");
    }
});
```

### Client-Side Redirect

The client changes the URL, causing a new request:

```html
<!-- Simple link -->
<a href="/new-page">Go to new page</a>

<!-- With JavaScript -->
<button onclick="window.location.href = '/new-page'">Go</button>
```

```javascript
// JavaScript redirect
window.location.href = "/new-page"; // Makes a new request
```

**Relative vs Absolute paths:**

```javascript
// Relative - stays on same domain
window.location.href = "/new-page"; // yoursite.com/new-page

// Absolute - goes to different domain
window.location.href = "https://google.com"; // google.com
```

### Server-Side vs Client-Side

| Feature | Server-Side | Client-Side |
|---------|-------------|-------------|
| Where it happens | Backend | Frontend |
| Control | Server decides | Client decides |
| SEO | Better (search engines understand) | Worse |
| Security | Better (server validates) | Worse (can be bypassed) |
| Use case | Auth, form submission | Navigation, user clicks |

## Memory Considerations

Loading multiple JavaScript files can use more memory. With modules (`type="module"`), you can:
- Import only what you need
- Browser optimizes loading
- Reduce global scope pollution

```javascript
// Bad - loads entire file even if you only need one function
<script src="huge-library.js"></script>

// Good - only import what you need
import { specificFunction } from './huge-library.js';
```


## File Paths in ES Modules

In Node.js with ES Modules, you can't use `__dirname` anymore. Use `path` instead:

```javascript
import path from 'path';

// You cant do this anymore
const publicPathDirname = res.sendFile(__dirname + "/index.html");

// Do this instead
const publicPathResolve = path.resolve("public/frontend/index.html");
```

## Quick Tips

Always use `express.static()` for serving static files  
Use `type="module"` for modern JavaScript  
Import only what you need. 