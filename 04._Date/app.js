require("express")

const express = require("express")

const app = express();



console.log(Date.now()) // Unixx EPoch Time. Secends since Jan 1 st 1970
console.log(new Date()) //UTC


// task create a route called /months that respends with the current time

const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


const weekdaysNames = ["Sunday", "Monday,", "Tuesday, Wednesday", "Thursday", "Friday", "Saturday"]

app.get("/months/v1", (req, res) => {
      
    const monthName = monthNames[new Date().getMonth()]
    
    console.log(monthName);

    res.send({ data: monthName });
})


app.get("/months/v2", (req, res) => {
      
    const currentMonth = new Date().toLocaleDateString("en-uk", {month: "long"})

    res.send({data: currentMonth})
})

// task write /Day and respond with the weekday


app.get("/day/v1", (req, res) => {
      
    const currentDay = weekdaysNames[new Date().getDay()]

     res.send({ data: currentDay });
})



app.get("/day/v2", (req, res) => {
      
    const currentDay = new Date().toLocaleDateString("en-uk", {weekday: "long"})

    res.send({data: currentDay})

})









const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("error,", error)
    }

    console.log(`Running server on port:`, PORT);
});




