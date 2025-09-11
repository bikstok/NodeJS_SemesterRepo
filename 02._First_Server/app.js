require("express");

const express = require("express");
const app = express();

// const app = require("express")();
        //endpoint 
                //callback function
app.get("/", (req, res) => {
    res.send("Hello World from Express!");
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



app.listen(8080);

