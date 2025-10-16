import express from "express";
import path from "path";

const app = express();

console.log(process.PWD);

app.use(express.static("public"));

// ============================PAGES===================================
import { frontpagePage, introductionPage } from './util/pageUtil.js';

app.get("/", (req, res) => {
    res.send(frontpagePage)
})

app.get("/introduction", (req, res) => {
    res.send(introductionPage)
})


// =============================SERVER=================================
const env = {
  PORT: 666,
};

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log("RUNNING SERVER ON PORT", PORT);
});

