# SERVER-SIDE RENDERING IN THIS PROJECT

This documentation site uses a **SSR with pre-rendering at startup**. All pages are built once when the server starts, then served instantly on each request.

## The Templating Engine

The templating engine (`templatingEngine.js`) is the foundation of how pages are constructed.

### How It Works

```javascript
// templatingEngine.js
import fs from 'fs';

// Read reusable components once at server startup
const header = readPage("./public/components/header/header.html");
const footer = readPage("./public/components/footer/footer.html");

// Global prism script and css for all pages that color codes javascript in browser.
const globalCssAndScripts = `
  <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.css" rel="stylesheet"/>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js" defer></script>
`;

export function constructPage(pageContent, options = {}) {
    return header
        .replace('$$TAB_TITLE$$', options.tabTitle || "NodeJS Notes")
        .replace('$$CSS_LINKS$$', options.cssLinks || "") 
        + globalCssAndScripts
        + pageContent 
        + footer;
}

export function readPage(path) {
    return fs.readFileSync(path).toString();
}
```

### What constructPage() Does

1. Takes the `header` component
2. Replaces placeholders (`$$TAB_TITLE$$`, `$$CSS_LINKS$$`)
3. Adds global CSS and JavaScript (Prism.js for syntax highlighting)
4. Inserts the page content (HTML or converted markdown)
5. Adds the `footer` component
6. Returns a complete HTML string

**Result:** A fully formed HTML page ready to send to the browser.

## The Page Utility

The page utility (`pageUtil.js`) uses the templating engine to pre-build all pages at startup.

### How Pages Are Built

```javascript
// util/pageUtil.js
import { readPage, constructPage } from "./templatingEngine.js";
import { marked } from "marked"; // Used to convert my md files to html 

// Frontpage (HTML)
const frontpage = readPage("./public/pages/frontend/index.html");
export const frontpagePage = constructPage(frontpage, {
    tabTitle: "NodeJS | Welcome"
});

// Git page (Markdown → HTML)
const gitMD = readPage("./public/pages/git.md");
const gitHTML = marked(gitMD);  // Here markdown is convert to HTML
export const gitPage = constructPage(gitHTML, {
    tabTitle: "NodeJS | Git"
});
```

### The Process Flow

1. **Read** markdown file from disk (`readPage()`)
2. **Convert** markdown to HTML using `marked` library
3. **Construct** complete page with header/footer (`constructPage()`)
4. **Export** as a constant that contains the full HTML string

**This happens once** when `pageUtil.js` is imported at server startup.

## Using Pre-Built Pages in Routes

The app.js imports the already built pages and serves them instantly:

```javascript
// app.js
import express from "express";
import { frontpagePage, gitPage} from './util/pageUtil.js';

const app = express();

app.use(express.static("public"));

// Routes send the pre-built HTML strings
app.get("/", (req, res) => {
    res.send(frontpagePage); 
});

app.get("/git", (req, res) => {
    res.send(gitPage);  // Already fully built
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("RUNNING SERVER ON PORT", PORT);
});
```

## The Complete Architecture


Server Startup:
1. Import pageUtil.js
2. pageUtil.js reads all markdown files
3. Converts markdown → HTML with marked
4. Wraps HTML with header/footer using constructPage()
5. Exports complete HTML strings

Request Handling:
1. User visits /git
2. Express route handler executes
3. Sends pre-built gitPage string


## Benefits of This Approach

### 1. Fast Response Times

```javascript
// No loading on each request
app.get("/git", (req, res) => {
    res.send(gitPage);  // Just sends a string
});

// Compare to reading and converting on every request:
app.get("/git", (req, res) => {
    const markdown = fs.readFileSync("git.md").toString();  
    const html = marked(markdown);  
    const page = constructPage(html); 
    res.send(page);
});
```
## Cons of SSR

### 1. Requires Server Restart for Content Updates

```javascript
// If you edit a .md, changes won't appear until server restarts
// because gitPage was built once at startup

// The exported constant doesn't change because it only runs when pageUtil.js is imported:
export const gitPage = constructPage(gitHTML, { ... });
// 
```

## Nodemon fix

I have created a nodemon.json that i've configured to watch all file changes on my project also restart my server when an md file is changed or html instead of the standard js/json files.
```js
// nodemon.json
{
  "watch": ["."], // Tells nodemon to watch all folders
  "ext": "*", // Tells nodemon to watch all file types
  "ignore": ["node_modules"], // Tells what folder nodemon should ignore
  "exec": "node app.js" 
}
```
### VERCEL Deployment

I've had problems trying to deploy my SSR project. Maybe i just cant figure it out, but it seems not as straight forward as CSR.

### Why SSR is good.

 SEO: You get more hits with google since all html is already loaded.
 Performance: Instant page loads improve user experience. 

## Client Side Rendering (CSR)

```javascript
app.get("/api/markdown/:file", (req, res) => {
    const markdown = fs.readFileSync(`${file}.md`).toString();
    res.json({ markdown });
});

// Client would fetch and render:
fetch("/api/markdown/git")
    .then(res => res.json())
    .then(data => {
        document.body.innerHTML = marked.parse(data.markdown);
    });
```

**Problems:**
- Slower first load (fetch + parse + render)
- Worse SEO because the pages are empty before they get rendered.


### Request SSR

```javascript
app.get("/git", (req, res) => {
    const gitMD = readPage("./public/pages/git.md");  
    const gitHTML = marked(gitMD); 
    res.send(constructPage(gitHTML));
});
```

**Problems:**
- Slower response times
- Server load increases with traffic

## Why CSR is good

- The client takes the load instead of your server