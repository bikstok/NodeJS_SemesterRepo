import express from "express";
import path from "path"

const app = express();

app.use(express.static("public"))


// const candyCommon = require ("./util/candyCommon.js")
// console.log(candyCommon)

import candyESModule from "./util/candyESModule.js";

console.log (path.resolve("public/redirection/redirection.html"))


app.get("/candy", (req, res) => {
    res.sendFile(path.resolve("public/candy/candy.html"))
})


let visitorsCount = 0;

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/frontend/index.html" ))
});


app.get("/redirection", (req, res) => {
    res.sendFile(path.resolve("public/redirection/redirection.html"))
})

app.get("/visitorscount", (req, res) => {
   res.send({data: ++visitorsCount})
});



app.get("/visitorsdoorway", (req, res ) => {
    res.redirect("/visitorscount")

})


app.listen(8080, () => {
console.log("server starting")
})