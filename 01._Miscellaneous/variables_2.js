"use strict";

// missing declartion
// totalGlobalVariable = "Never ever do this";

// var globalScope = "never do this!"

// use const whenever possible otherwise use let if we ever intend to reassign the variable
const public = "variable name is reserved";


const someType = 123;4; // number
someType = 456; // error because we used const

notConstantArray.

{ // block scope
    console.log("block scope");
    let blockScope = "only available in this block";
    console.log(blockScope);
}

function test() { // function scope
    console.log("function scope");
    let functionScope = "only available in this function";
    console.log(functionScope);
}


for ( var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}