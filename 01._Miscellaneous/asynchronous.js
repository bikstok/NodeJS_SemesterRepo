// JavaScript is single-threaded, everything runs in a main thread.

import { error } from "console";

// examples of async sitatuions

// network, user input, file system, handling, databases-

// Solution 1: callback

// Problem: Callback hell / Pyramid of doom

// Solution 2: Promises (syntaks sukker of callback functions)

// pending => fulfilled
// resolved | rejected

// Problem: 

/* 

new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            throw "oh no"
            resolve("all good ");
        } catch (error) {
            reject(error);
        }
    },2000)
})
.then((message) => console.log(message))
.catch((errorMessage) => console.log(errorMessage))

*/

function myPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // throw new Error ("something bad")
        resolve("all good ");
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}

myPromise()
  .then((succesMessage) => {
    console.log(succesMessage);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });


const succesMessage = await myPromise();