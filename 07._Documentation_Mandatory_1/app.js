import express from "express";
import path from "path";

const app = express();

console.log(process.PWD);

app.use(express.static("public"));

// ============================PAGES===================================
import { frontpagePage, indtroductionPage } from './util/pageUtil.js';

app.get("/", (req, res) => {
    res.send(header + frontpagePage + footer)
})

app.get("/introduction", (req, res) => {
    res.sendFile(header + indtroductionPage + footer)
})



// =============================SERVER=================================
const env = {
  PORT: 666,
};

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log("RUNNING SERVER ON PORT", PORT);
});

