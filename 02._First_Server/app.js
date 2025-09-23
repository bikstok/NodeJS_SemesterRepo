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


app.get("/fashionbrands", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Always send JSON from an API.
app.get("/planets", (req, res) => {
    res.send({planets: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]});
});

app.get("/planets/favoritePlanet", (req, res) => {
    res.send({planets: "Pluto"});
});

                    //path variable
app.get("/waterfalls/:id", (req, res) => {
    console.log(req.params);
    res.send({
        waterfall: `You requested waterfall number ${req.params.id}`
    });
});

// assignment create a /url route, create a query string with the length of "medium" and spiciness level of 6
// /urls?length=medium&spiciness=6
app.get("/urls", (req, res) => {
    console.log(req.query)
    res.send({data: req.query});
})


app.post("/subjects", (req, res) =>  {
    console.log(req.body)
    res.send({data: req.body})
})



// task create a post fashin brand and try esnding a new fashing brand via postman

app.post("/fashionbrands", (req, res) => {
    console.log(req.body)
    res.send({data: req.body})
})

app.listen(8080);

