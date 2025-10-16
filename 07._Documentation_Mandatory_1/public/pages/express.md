# NODE.JS

Node.js is basically a JavaScript runtime that lets you run JavaScript outside the browser. Normally JS only runs in browsers, but Node.js uses Chrome's V8 engine to run it on your computer or server. This is huge because now you can use JavaScript for backend stuff like servers, APIs, databases, etc.

## Installing Node.js

Go to https://nodejs.org and download the LTS version (Long Term Support). After installing, check if it worked:

```bash
$ node --version
$ npm --version
```

npm is Node Package Manager - it comes with Node.js automatically and lets you install packages/libraries.

## Running JavaScript Files

You can run any .js file with Node:

```bash
$ node app.js
```
## Starting a Node Project

Every Node project needs a `package.json` file. This tracks all your dependencies and project info, running this command creates it:

```bash
$ npm init
```
Here is how the ``package.json`` looks for my DogInder school project:

```js
{
  "name": "doginder",
  "version": "0.0.1",
  "description": "Tinder for indian dogs",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env PORT=9090 nodemon app.js",
    "prod": "node app.js"
  },
  "keywords": [
    "Indian",
    "Curry",
    "Spicy",
    "Dogs",
    "smelly",
    "romance"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@faker-js/faker": "^10.0.0",
    "express": "^5.1.0"
  },
  "devDependencies": {
    "cross-env": "^10.1.0"
  }
}
```

``package-lock.json`` is a file that gets auto-generated and you should never edit it manually. It locks down the exact versions of every package and sub-dependency insuring other people installing your project has the exact same dependcies

Important: Always commit both ``package.json`` and ``package-lock.json`` to git! Don't add them to ``.gitignore``.

## What is Express?

Express is a framework for Node.js that makes building web apps way easier. Think of it like this Node.js gives you the raw tools, but Express organizes everything and adds helpful features.

Without Express, you'd have to manually parse URLs, handle different routes, deal with request bodies, etc. Express does all that for you.

## Installing Express

Make sure you have a `package.json` first, then:

```bash
$ npm install express
```

This creates a `node_modules` folder with Express and all its dependencies. Your `package.json` will update to show Express as a dependency.

## First Express Server

```javascript
require("express");

const express = require("express");
const app = express();

// sets up body parsing
app.use(express.json())

// const app = require("express")();
        //endpoint 
                //callback function
app.get("/", (req, res) => {
    res.send("Hello World from Express!");
}); 

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
```

```bash
$ node app.js
```

That's it. Express handles all the HTTP stuff behind the scenes.

## Installing More Packages

npm has thousands of packages. Install them like this:

```bash
$ npm install package-name
```

**nodemon** is a very helpful tool that restarts your server when you save files:

```bash
$ npm install -g nodemon
```
Notice the -g. That means it's installed globaly. Now run your app using nodemon using this command:
```bash
$ nodemon app.js
```

Now you don't have to manually restart the server every time you change code which saves a lot of clicks and time.

## How Node and Express Work Together

Node.js is the foundation - it's what actually runs your JavaScript code. Express is a library that sits on top of Node and makes building web stuff easier.

You need Node.js installed on your computer no matter what. Then you install Express into your project when you want to build a web app or API.

Basic flow: Install Node → Create project → Install Express → Build your app
