# JAVASCRIPT FUNDAMENTALS

## Variables and Data Types

JavaScript has three ways to declare variables: `var`, `let`, and `const`.

### const vs let vs var

```javascript
const name = "Jakob";  // Can't be reassigned
let age = 25;          // Can be reassigned
var city = "Copenhagen"; // Old way, DON'T USE THIS
```

**Rule:** Always use `const` if possible, otherwise use `let`. Never use `var`.

```javascript
const MOMS = 0.25;
PI = 0.25; // Error! Can't reassign const

let count = 0;
count = 1; // This works fine

const person = { name: "Jakob" };
person.name = "Jakoline"; // This works! Objects are mutable
person = {}; // Error! Can't reassign the variable itself
```

### Data Types

JavaScript has these basic types:

```javascript
// Primitives
const text = "Hello";           // String
const number = 123.4;           // Number
const isTrue = true;            // Boolean
const nothing = null;           // Null (intentional absence)
const notDefined = undefined;   // Undefined (hasn't been set)
const bigNumber = 123n;         // BigInt (for really large numbers)

// Reference types
const array = [1, 2, 3];        // Object (yes, arrays are objects)
const object = { key: "value" }; // Object
const func = function() {};     // Function (also an object)
```
### Template Literals

Use backticks for string interpolation:

```javascript
const name = "Jakob";
console.log(`Hello ${name}`, 2 + 2); // "Hello Jakob" 4
```

### Objects

Objects store key-value pairs:

```javascript
const person = {
    name: "Jakob",  // key: value
    age: 25,
    isStudent: true
};

console.log(person.name); // "Jakob"
console.log(person["age"]); // 25
```

## Strict Mode

Always use strict mode at the top of your files - it catches common mistakes:

```javascript
"use strict";

// This would create a global variable without strict mode - BAD
// totalGlobalVariable = "Never do this";  // Error in strict mode!

// With strict mode, you MUST declare variables
const properVariable = "This is correct";
```

## Scoping

Scope determines where variables are accessible.

### Block Scope

`const` and `let` are block-scoped - they only exist within the `{}` they're defined in:

```javascript
{ // block scope
    console.log("block scope");
    let blockScope = "only available in this block";
    console.log(blockScope); // works
}
console.log(blockScope); // Error! doesn't exist out here
```

### Function Scope

Variables declared in a function only exist in that function:

```javascript
function test() { // function scope
    console.log("function scope");
    let functionScope = "only available in this function";
    console.log(functionScope); // works
}
console.log(functionScope); // Error! doesn't exist outside
```

### Why var is Dangerous

`var` has weird scoping and should never be used:

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}
// Logs: 5, 5, 5, 5, 5 (WAT?!)
// Because var leaks out of the loop and by the time setTimeout runs, i is 5

// With let, it works correctly:
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}
// Logs: 0, 1, 2, 3, 4 (as expected)
```

## Functions

### Function Declaration

```javascript
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

// Function declarations get "hoisted" - you can call them before they're defined
console.log(getRandomInt(5, 10)); // Works even though function is defined below
```

### Function Expression (Anonymous Function)

```javascript
const whatIsThisAnonymousFunction = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

// Can't be hoisted - must be defined before use
```

### Arrow Functions

Modern, shorter syntax:

```javascript
const whatIsThisArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

// If just returning something, you can omit braces and return
const add = (a, b) => a + b;

// One parameter? Parentheses optional
const double = x => x * 2;

// No parameters? Need empty parentheses
const sayHi = () => "Hi!";
```

### Callback Functions

A callback is a function passed as an argument to another function and potentially called later:

```javascript
function genericActionPerformer(name, action) {
    return action(name); // calling the callback
}

function cookingAction(name) {
    return `${name} enjoys cooking, yum yum!`;
}

// Passing a function as an argument
console.log(genericActionPerformer("Jens", cookingAction));
// "Jens enjoys cooking, yum yum!"

const runningAction = (name) => {
    return `${name} loves to run!`;
};

console.log(genericActionPerformer("Marco", runningAction));
// "Marco loves to run!"

// Inline anonymous arrow function as argument
console.log(genericActionPerformer("Lucas", (name) => `${name} likes asking questions`));
// "Lucas likes asking questions"
```

## Loop Methods

Use loop methods instead of traditional for loops unless you're "finger counting".

### When to Use Each Method

- `.forEach()` - Loop through array, don't return anything
- `.map()` - Transform each element, return new array (1:1 with original)
- `.filter()` - Keep only elements that pass a test
- `.reduce()` - Combine array into single value
- `.find()` - Get first element that matches
- `.some()` - Check if at least one element passes test
- `.every()` - Check if all elements pass test
- `.includes()` - Check if array contains a value

### Bad Ways vs Good Ways

```javascript
const numbers = [1, 2, 3, 4, 5];

// Assignment: double the numbers in an array

// 1. for loop - works but meh
let doubledNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    doubledNumbers.push(numbers[i] * 2);
}
console.log(doubledNumbers); // [2, 4, 6, 8, 10]

// 2. forEach - better but still mutating external array
let doubledNumbers2 = [];
numbers.forEach((number) => {
    doubledNumbers2.push(number * 2);
});
console.log(doubledNumbers2); // [2, 4, 6, 8, 10]

// 3. map - CORRECT WAY! Doesn't mutate original
const doubledNumbers3 = numbers.map((number) => number * 2);
console.log(doubledNumbers3); // [2, 4, 6, 8, 10]
```

### Real Example with map()

```javascript
const desserts = [
    { name: "Chocolate Cake", calories: 350 },
    { name: "Ice Cream", calories: 200 },
    { name: "Apple Pie", calories: 250 },
    { name: "Cupcake", calories: 400 }
];

// Assignment: add 400 calories to all desserts except Cupcake

// Long version with if/else
const updatedDesserts = desserts.map((dessert) => {
    if (dessert.name !== "Cupcake") {
        return {
            name: dessert.name,
            calories: dessert.calories + 400
        };
    } else {
        return dessert;
    }
});

console.log(updatedDesserts);
// Original desserts array is unchanged!
console.log(desserts);

// Cleaner version with ternary operator
const biggerPortionDesserts = desserts.map((dessert) => ({
    name: dessert.name,
    calories: dessert.name === "Cupcake" ? dessert.calories : dessert.calories + 400
}));

console.log(biggerPortionDesserts);
```

### map() Parameters

map() actually gives you three parameters (most of the time you only need the first):

```javascript
numbers.map((element, index, array) => {
    console.log(element, index, array);
    return element * 2;
});

// element: the current item
// index: the position (0, 1, 2, etc.)
// array: the entire original array
```

### Implicit Return

With arrow functions, if you don't use `{}`, it automatically returns:

```javascript
// Explicit return
const double = (x) => {
    return x * 2;
};

// Implicit return
const double = (x) => x * 2;

// With map
numbers.map((element) => element * 2); // implicit return
```

## Avoiding Side Effects

Side effects = when a function modifies something outside itself. Try to avoid them with loop methods:

```javascript
// Bad - has side effects (mutating external variable)
let results = [];
numbers.forEach((num) => {
    results.push(num * 2); // Side effect!
});

// Good - pure function (no side effects)
const results = numbers.map((num) => num * 2);
```

## Ternary Operator

Short form of if/else:

```javascript
// Long version
let result;
if (age >= 18) {
    result = "adult";
} else {
    result = "minor";
}

// Ternary version
const result = age >= 18 ? "adult" : "minor";

// Format: condition ? valueIfTrue : valueIfFalse
```

## Quick Reference

| Method | Purpose | Returns | Mutates Original? |
|--------|---------|---------|-------------------|
| `map()` | Transform each element | New array | No |
| `filter()` | Keep elements that pass test | New array | No |
| `reduce()` | Combine to single value | Any value | No |
| `forEach()` | Do something with each | undefined | No |
| `find()` | Get first match | Element or undefined | No |
| `some()` | Check if any match | Boolean | No |
| `every()` | Check if all match | Boolean | No |
| `includes()` | Check if contains value | Boolean | No |