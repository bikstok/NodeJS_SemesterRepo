
## ENIVORMENT VARIABLES & CLIENT VS. SERVER 

## Environment Variables

Environment variables let us store configuration and secrets outside our code.

### Using Environment Variables in Node.js

**app.js:**
```javascript
import express from 'express';
const app = express();

// Access environment variables through process.env
const PORT = Number(process.env.PORT);
const API_KEY = process.env.API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

app.get('/api/data', (req, res) => {
    // Use the API key securely on the server
    console.log(`Using API key: ${API_KEY}`);
    res.send({ message: 'API key is secure on server' });
});

app.listen(PORT, () => {
    console.log("Server is starting on port: ", PORT);
});
```

**Setting environment variables:**

On Windows:
```bash
set PORT=3000
set API_KEY=your_secret_key
node app.js
```

Or in package.json scripts:
```js
{
  "scripts": {
    "start": "PORT=8080 node app.js"
  }
}
```

## Package.json Scripts

Package.json isn't just for dependencies, we can define custom scripts to run common tasks.

### Creating Scripts

In your `package.json`:

```js
{
  "scripts": {
    "dev": "cross-env PORT=8080 nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

Run them with:
```bash
npm run dev      # runs "cross-env PORT=8080 nodemon app.js" this will make a enviroment variable port be 8080
npm run test     # runs "node test.js" with no test specified
```

This is useful for:
- Starting your dev server
- Running tests
- Any repetitive commands you'd otherwise have to type out



## Fetching in Node.js vs. Browser

Fetching works differently depending on where your code runs.

### Client-Side Fetching Example
```javascript
// This runs in the browser
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
```

**Issues with client-side fetching:**
- Subject to CORS restrictions
- API keys visible in browser (security risk!)
- User's device does the work

### Server-Side Fetching Example

**app.js:**
```javascript
import express from 'express';
import { getMatches } from './util/matches.js';
const app = express();

// Fetch API data on the server
app.get('/api/matches', async (req, res) => {
    const amount = req.query.amount || 5;
    
    try {
        const matches = await getMatches(Number(amount));
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log("Server is starting on port: ", PORT);
});
```

**util/matches.js:**
```js
import { fakerEN_IN } from '@faker-js/faker';

export async function getMatches(amountOfMatches = 5) {
    const promises = [];
    
    for (let i = 0; i < amountOfMatches; i++) {
        const promise = fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => response.json());

        promises.push(promise);
    }
    
    const results = await Promise.all(promises);
    const matches = results.map((result) => ({ 
        imageURL: result.message, 
        ...getIndianProfile() 
    }));

    return matches;
}

function getIndianProfile() {
    return {
        name: fakerEN_IN.person.fullName(),
        bio: fakerEN_IN.person.bio(),
        address: fakerEN_IN.location.streetAddress(),
        city: fakerEN_IN.location.city()
    };
}
```
**Benefits of server-side fetching:**
- No CORS issues (your server can fetch from anywhere)
- Keeps API keys secure
- You control what data gets sent to the client

### When to Use Each

Choose based on:
- Do you need to keep credentials secret? → **Server-side**
- Is it public data with no API key? → Either works
- Do you want to reduce server load? → **Client-side**
- Do you want to reduce client load? → **Server-side**
- Do you need to avoid CORS issues? → **Server-side**

### Proxy
You can create a proxy by fetching a URL and then sending the fetched data back to the client:
 ```js
app.get("/proxy", (req, res) => {
    fetch("https://google.com", {
  method: "GET", 
  headers: {
    "Content-Type": "application/json"
  }
})
    .then(response => {
    return response.text();
  })
  .then(data => {
    console.log(data);
    res.send(data)
  })
})

 ```



## Semantic HTML

Using the right HTML elements makes your page more accessible and easier to understand.

### Key Semantic Elements

- `<nav>` - Navigation menus
- `<main>` - Main content of the page
- `<footer>` - Footer content

Example structure:

```html
<nav>
  <!-- Navigation links -->
</nav>

<main>
  <!-- Your main content -->
</main>

<footer>
  <!-- Footer content -->
</footer>
```

### Sticky Footer Trick

Want your footer at the bottom always? Here's one way:

```css
body {
    min-height: 95vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
```
This makes the main content grow to fill available space, pushing the footer down.

**File structure:**
```
project/
├── app.js                   (SERVER - Node.js)
├── public/                  (CLIENT - served to browser)
│   ├── index.html           (CLIENT)
│   ├── css/
│   │   └── style.css        (CLIENT)
│   └── js/
│       └── script.js        (CLIENT)
```
## Frontend Structure

Good project structure makes your code easier to maintain.

### Suggested Structure

```
project/
├── public/
│   ├── pages/
│   │   ├── index.html
│   │   └── about.html
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   └── images/
└── server files here
```

Organizing by purpose (pages, assets) rather than dumping everything in one folder makes it easier to find things as your project grows.
