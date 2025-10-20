# TIME & DATE

JavaScript provides a built-in Date object, which includes a variety of methods for handling and formatting dates and times. Below is a quick overview of how it works and how to use it effectively.

To create a new date object with the current date and time, you simply use:

```js
const timeNow = new Date()
console.log("The time now is: ", rightNow); // The time now is:  2025-10-20T12:30:11.231Z
```

The time will match what my computers time is.
We can get more specific types of times and dates. Year, month, day, min and secends:

```js
console.log("This year: ", timeNow.getFullYear());  //This year:  2025
console.log("This month", timeNow.getMonth());        //This month 9
console.log("This day of the month", timeNow.getDate());    //  This day of the month 20
console.log("This hour", timeNow.getHours());   //This hour 17
console.log("This minute", timeNow.getMinutes());    //This minute 33
console.log("This second", timeNow.getSeconds());    //This second 21
```

We can other country formats, we can do the following:

```js
console.log("Danish:", rightNow.toLocaleDateString("da-DK")); //Danish: 12.10.2025
console.log("Freedom Format:", rightNow.toLocaleDateString("en-US")); // Freedom Format: 10/12/2025
```

## Using Arrays

You can also create your own array and handle it through there, but that is a less convenient method.

```js
const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

app.get("/months/v1", (req, res) => {
      
    const monthName = monthNames[new Date().getMonth()]
    
    console.log(monthName);

    res.send({ data: monthName });
})
```
Same for weekdays, but notic you have to put Sunday first in the array, since that's how americans do it.

```js
const weekdaysNames = ["Sunday", "Monday,", "Tuesday, Wednesday", "Thursday", "Friday", "Saturday"]

app.get("/day/v1", (req, res) => {
      
    const currentDay = weekdaysNames[new Date().getDay()]

     res.send({ data: currentDay });
})

```