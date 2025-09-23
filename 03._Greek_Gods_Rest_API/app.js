require("express");

const express = require("express");
const app = express();

app.use(express.json())

const greekGods = [
    { id: 1, name: "Zeus", power: "Thunder", isDemiGod: false },
    { id: 2, name: "Hera", power: "Marriage", isDemiGod: false },
    { id: 3, name: "Poseidon", power: "Sea", isDemiGod: false },
    { id: 4, name: "Demeter", power: "Harvest", isDemiGod: false },
    { id: 5, name: "Athena", power: "Wisdom", isDemiGod: false },
    { id: 6, name: "Apollo", power: "Sun", isDemiGod: false },
    { id: 7, name: "Artemis", power: "Hunt", isDemiGod: false },
    { id: 8, name: "Ares", power: "War", isDemiGod: false },
    { id: 9, name: "Aphrodite", power: "Love", isDemiGod: false },
    { id: 10, name: "Hephaestus", power: "Fire", isDemiGod: false },
    { id: 11, name: "Hermes", power: "Travel", isDemiGod: false },
    { id: 12, name: "Dionysus", power: "Wine", isDemiGod: false },  
    { id: 13, name: "Hades", power: "Underworld", isDemiGod: false },
    { id: 14, name: "Hestia", power: "Hearth", isDemiGod: false },
    { id: 15, name: "Persephone", power: "Spring", isDemiGod: false }
];

// Track auto-increment IDs (simulate MySQL behavior)
let nextGreekGodId = 16;

// READ all
app.get("/greekgods", (req, res) => {
    res.send({ data: greekGods });
});

// READ by id
app.get("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGod = greekGods.find((greekGod) => greekGod.id === providedGreekGodId);

    if (!foundGreekGod) {
        return res.status(404).send({ errorMessage: `Greek God not found by id ${providedGreekGodId}` });
    }
    res.send({ data: foundGreekGod });
});

// CREATE
app.post("/greekgods", (req, res) => {
    req.body.id = nextGreekGodId++;
    greekGods.push(req.body);

    res.send


// ____________________________________________________

    const providedGreekGodName = req.body.name;
    const providedIsDemiGod = req.body.isDemiGod;

    if (!providedGreekGodName || typeof providedGreekGodName !== "string") {
        return res.status(400).send({ errorMessage: "Name is required and must be a string" });
    }
    
    const createdGreekGod = {
        id: nextGreekGodId++,
        name: providedGreekGodName,
        ...(providedIsDemiGod !== undefined && { isDemiGod: providedIsDemiGod })
    };

    greekGods.push(createdGreekGod);
    res.status(201).send({ data: createdGreekGod });
});

// UPDATE (replace all fields)
app.put("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGodIndex = greekGods.findIndex((greekGod) => greekGod.id === providedGreekGodId);

    if (foundGreekGodIndex === -1) {
        return res.status(404).send({ errorMessage: `Greek God not found by id ${providedGreekGodId}` });
    }

    const providedGreekGodName = req.body.name;
    const providedIsDemiGod = req.body.isDemiGod;

    if (!providedGreekGodName || typeof providedGreekGodName !== "string") {
        return res.status(400).send({ errorMessage: "Name is required and must be a string" });
    }

    const updatedGreekGod = {
        id: providedGreekGodId,
        name: providedGreekGodName,
        ...(providedIsDemiGod !== undefined && { isDemiGod: providedIsDemiGod })
    };

    greekGods[foundGreekGodIndex] = updatedGreekGod;

    res.send({ data: updatedGreekGod });
});

// PATCH (partial update)
app.patch("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGod = greekGods.find((greekGod) => greekGod.id === providedGreekGodId);

    if (!foundGreekGod) {
        return res.status(404).send({ errorMessage: `Greek God not found by id ${providedGreekGodId}` });
    }

    const providedGreekGodName = req.body.name;
    const providedIsDemiGod = req.body.isDemiGod;

    if (providedGreekGodName !== undefined && typeof providedGreekGodName !== "string") {
        return res.status(400).send({ errorMessage: "Name must be a string" });
    }

    if (providedGreekGodName !== undefined) foundGreekGod.name = providedGreekGodName;
    if (providedIsDemiGod !== undefined) foundGreekGod.isDemiGod = providedIsDemiGod;

    res.send({ data: foundGreekGod });
});

// DELETE
app.delete("/greekgods/:id", (req, res) => {
    const providedGreekGodId = Number(req.params.id);
    const foundGreekGodIndex = greekGods.findIndex((greekGod) => greekGod.id === providedGreekGodId);

    if (foundGreekGodIndex === -1) {
        return res.status(404).send({ errorMessage: `Greek God not found by id ${providedGreekGodId}` });
    }

    const deletedGreekGod = greekGods.splice(foundGreekGodIndex, 1)[0];
    res.send({ data: deletedGreekGod });
});

// app.listen can be given a callback function in the second arguement.
const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("error,", error)
    }

    console.log(`Running server on port:`, PORT);
});