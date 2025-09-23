// .forEach .find  .forEach .map .filter .reduce .some .every .includes

// .forEach loops through the entire array but does not return a new list. Use if you dont care about the original array

// .filter creates a new array with all elements that pass the test implemented by the provided function

// .map returns a new list 1:1 with the original array. Use if you want to keep the original array



// use loop methods unluss you finger count

console.log("Hello from loops_methods.js");

const numbers = [1,2,3,4,5];

// assigment: doubele the numbers in an array

// 1. for loop
let doubledNumbers = [];
for(let i=0; i < numbers.length; i++){
    doubledNumbers.push(numbers[i] * 2);
}

console.log("doubledNumbers1", doubledNumbers);

// 2. .forEach
let doubledNumbers2 = [];
numbers.forEach((number) => {
    doubledNumbers2.push(number * 2);
});

console.log("doubledNumbers2", doubledNumbers2);

// 3. .map correct way if you dont want to mutate the original array

const doubledNumbers3 = numbers.map((number) => number * 2);
console.log("doubledNumbers3", doubledNumbers3);



const desserts = [
    {   name: "Chocolate Cake", 
        calories: 350
    },
    {
        name: "Ice Cream", 
        calories: 200},
    {
        name: "Apple Pie", 
        calories: 250 },
    {
        name: "Cupcake", 
        calories: 400 }
];

// assigment: make all desserts 400 calories extra except for cupcake
// map -> new array without mutating the original array
const updatedDesserts = desserts.map((dessert) => {
    if (dessert.name !== "Cupcake"){
        return {
            name: dessert.name,
            calories: dessert.calories + 400
        };
    } else {
        return dessert;
    }
});

console.log("updatedDesserts", updatedDesserts);
console.log("desserts", desserts);


// ternary statement version
const biggerPortiendDesserts = desserts.map((dessert) => ({ 
    name: dessert.name,
    calories: dessert.name === "Cupcake" ? dessert.calories : dessert.calories + 400

}));

console.log("biggerPortiendDesserts", biggerPortiendDesserts);


numbers.map((element, index, array)  => (console.log(element, index, array) )) // implicit return

