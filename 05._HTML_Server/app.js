const express = require("express")


const app = express();


let visitorsCount = 0;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html" )
});


app.get("/visitorscount", (req, res) => {
   res.send({data: ++visitorsCount})
});






app.listen(8080, () => {

})