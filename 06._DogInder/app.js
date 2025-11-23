import express, { urlencoded } from "express";
import path from "path";

const app = express();

console.log(process.PWD);

app.use(express.static("public"));
app.use(express.urlencoded())

import matchesRouter from "./routers/matchesRouter.js"
app.use(matchesRouter)
import pagesRouter from  "./routers/pagesRouter.js"
app.use(pagesRouter)
import contactRouter from "./routers/contactRouter.js"
app.use(contactRouter)


const env = {
  PORT: 666,
};

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log("RUNNING SERVER ON PORT", PORT);
});
