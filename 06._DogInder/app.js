import express from "express";
import path from "path";

const app = express();


console.log(process.PWD)


app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/frontend/index.html"))
})

app.get("/matches", (req, res) => {
    res.sendFile(path.resolve("public/pages/matches/matches.html"))
})


const env = {
    PORT: 666
}

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("RUNNING SERVER ON PORT", PORT)
})
