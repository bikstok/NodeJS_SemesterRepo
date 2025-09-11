// hoisting in functions

console.log(getRandomInt(5, 10));

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)  + min);
}

const whatIsThisAnonymouseFunction = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)  + min);
};


const whatIsThisArrowFunction = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)  + min);
};

console.log(whatIsThisArrowFunction)


                                        //callback function
                                        // callback bliver sendt videre til en anden funktion
                                        // a function that is passed as an argument to another function
                                        // and only potentially called (or executed) at a later time

function genericActionPerfomer (name, action) {
    return action(name);
}

function cookingAction (name) {
    return `${name} enjoys cooking, yum yum!`;
}


console.log(genericActionPerfomer("Jens", cookingAction));


const runningAction = (name) =>{
    return `${name} loves to run!`;
};

// passing in a function as argument
console.log(genericActionPerfomer("Marco", runningAction));


// inline anonymouse arrow function as argument
console.log(genericActionPerfomer("Lucas", (name) => `${name} likes asking questions`));
