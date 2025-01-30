export const NamasteJavascript2 = `
# Advanced JavaScript Concepts

## 1. Callback Hell

### Understanding Callbacks
Callbacks are very important in JavaScript, which makes asynchronous operations possible. We pass a function as callback and execute it later once an asynchronous operation is completed.

### What is Callback Hell?
Callback hell occurs when we have multiple nested callbacks. In the example below, once createCart is successful, the callback we passed will execute, and proceedToPayment executes once that is completed. This nesting of callbacks leads to callback hell:

\`\`\`javascript
appId.createCart(cartObj, () => {
    api.proceedTopayment(pay, () => {
        // More nested callbacks...
    })
})
\`\`\`

### Inversion of Control
We are calling some external function and passing our piece of code as a callback, asking them to execute once some async operation/task is completed. Here we lose control, and they may even fail to execute the callback function. This is called inversion of control - control is passed to the external function.

## 2. Promises

Promises help solve callback hell and inversion of control issues. In JavaScript, a Promise is a built-in object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It provides a way to work with asynchronous code more effectively, handling operations like data fetching, file reading, or timer-based tasks.

### Promise States
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### Example of Promise Usage
\`\`\`javascript
const url = "";
const user = fetch(url);
\`\`\`

In this example:
1. The user variable first has a value of undefined in memory allocation phase
2. When fetch is called, a Promise object with state=pending and result:undefined is assigned
3. Once the asynchronous operation completes, the state changes to fulfilled and the data is set in result

### Key Promise Features
1. **Solves Inversion of Control**: Instead of passing callbacks, we can use .then() which executes once promise is fulfilled, and .catch() for rejections
2. **Guaranteed Execution**: The JavaScript engine guarantees proper execution of promise handlers
3. **Immutable Results**: The data in the promise response is immutable

### Promise Chaining
Promises solve the horizontal growth of code with clean chaining:

\`\`\`javascript
api.createCart(cartObj)
    .then(() => {
        return api.proceedTopayment(pay);
    })
    .then(() => {
        // Continue chain...
    });
\`\`\`

### Creating a Promise, Chaining & Error Handling
A promise can be created with the help of the Promise constructor function, we have to pass a callback method as a parameter, which will have access to resolve and reject methods.

\`\`\`javascript
const cart = ["shoes", "pants"];
const promise = createCart(cart);
console.log(promise); // Promise {<pending>}

promise
 .then((orderId) => {
     console.log(orderId); // 12
 })
 .catch((error) => {
     console.log(error); // Cart is empty
 });

function createCart(cart) {
 return new Promise((resolve, reject) => {
     if (!validateCart(cart)) {
         reject(new Error("Cart is empty"));
     }
     const orderId = 12;
     setTimeout(() => {
         resolve(orderId);
     }, 1000);
 });
}

function validateCart(cart) {
 return cart.length !== 0;
}
\`\`\`

### Promise Chaining Example
We can chain promises, and attach a catch block, if anything in the chain fails, it will catch in the catch block.

\`\`\`javascript
const cart = ["shoes", "pants"];
const promise = createCart(cart);
console.log(promise); // Promise {<pending>}

promise
 .then((orderId) => {
     console.log(orderId); // 12
     return orderId;
 })
 .then((ordId) => {
     console.log(ordId); // 12
     return proceedToPayment(ordId);
 })
 .then((paymentId) => {
     console.log(paymentId); // 34
     return proceedToPayment(paymentId);
 })
 .catch((error) => {
     console.log(error); // Cart is empty
 });

function createCart(cart) {
 return new Promise((resolve, reject) => {
     if (!validateCart(cart)) {
         reject(new Error("Cart is empty"));
     }
     const orderId = 12;
     setTimeout(() => {
         resolve(orderId);
     }, 1000);
 });
}

function validateCart(cart) {
 return cart.length !== 0;
}

function proceedToPayment(orderId) {
 return new Promise((resolve, reject) => {
     const paymentId = 34;
     setTimeout(() => {
         resolve(paymentId);
     }, 1000);
 });
}
\`\`\`

- Catch in the above examples will run if any of the above promise chain fails. For example: if createCart fails, it will execute catch. But if there are scenarios where even if the cart API fails, we need to continue with the rest of the promise chain. We need to add a separate catch block for createCart.
- The catch block will execute for all the promise chain above. If any specific catch is added, it won't catch in the common catch below.
- In the below example, if createCart fails it will catch in its own catch block, not in the common catch, and continue executing the rest of the blocks.
- Catch is used to gracefully handle errors, to avoid throwing in browsers.
- In the case of a promise, we attach callback methods (which is more reliable), but in the callback, we are passing a function and asking a third party to execute.

\`\`\`typescript
promise
    .then((orderId) => {
        console.log(orderId); // 12
        return orderId;
    })
    .catch((error) => {
        console.log(error); // Catch specifically added for createCart to continue running promise chain below
    })
    .then((ordId) => {
        console.log('No matter what happened, this will run'); // 12
    })
    .catch((error) => {
        console.log(error); // Any error in promise chain, common catch
    });
\`\`\`

### 4. async/await

Async/await is used to handle promises. The previous way of handling promises was then/catch.

\`\`\`typescript
async function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data");
        }, 1000);
    });
}

getData().then((res) => {
    console.log(res); // Data
});
\`\`\`

#### What is async:

Async functions will always return a promise. Using the keyword async we can make any function async. Even if we are returning a non-promise, e.g., string or number, it will wrap the string with a promise and return from the function. It will be fulfilled and the result will be the string returned. Now either with then/catch callback get the data returned or with await.

If the async function returns a promise, it will return directly without wrapping. And with proper status and data in result. With then/catch or await get the returned value.

\`\`\`typescript
async function getData() {
    return "Data";
}

const data = getData();
console.log(data); // Promise { 'Data' }
\`\`\`

#### What is await:

How async/await works:

Examples of using async/await:

Await can only be used inside an async function. Await written in front of a promise and it resolves the promise.

\`\`\`typescript
const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data");
    }, 1000);
});

async function getData() {
    const data = await prom;
    console.log(data); // Data
}
\`\`\`

- Await will wait in the async function and execute the rest of the lines in the async function after successfully resolving the promise. But JavaScript won't stop execution, it will continue with the rest of the tasks.
- In the below example, first memory allocation for promiseOne, promiseTwo, and function fetchData.
- In the code execution phase, promiseOne starts execution and starts the timer, and moves the setTimeout callback to the web API and waits for the timer to complete, the same happens in promiseTwo.
- A new Execution Context (EC) is created for the fetchData function. Seeing the await operation, it will not execute the rest of the lines in the function, it terminates it from the call stack, fetchData is removed from the call stack.
- Continue with other execution ('Hello Gokul') line executed in the Global Execution Context (GEC).
- After promiseOne is settled (10 seconds), the event loop again pushes fetchData to the call stack and continues where it left in the function.
- Since both timers already started and promiseTwo has a 5-second timeout, it already settled, it continues with promiseTwo resolving and completes function execution.
- If promiseTwo is not settled (longer time than the first promise), it again terminates fetchData function execution and continues with the rest of the execution. And comes back once it is resolved.

Important: The JavaScript engine doesn't wait in the async function await statement, it terminates the function from the call stack and continues executing GEC and other function ECs (otherwise the webpage will be frozen), and when the call stack is empty and the promise is resolved, it again adds back the function to the call stack and continues from where it left.

\`\`\`typescript
const promiseOne = new Promise((resolve, reject) => {
    console.log("promiseOne timer start");
    setTimeout(() => {
        console.log("resultOne resolving");
        resolve("ResultOne");
    }, 10000);
});

const promiseTwo = new Promise((resolve, reject) => {
    console.log("promiseTwo timer start");
    setTimeout(() => {
        console.log("resultTwo resolving");
        resolve("ResultTwo");
    }, 5000);
});

async function fetchData() {
    console.log("before await promiseOne");
    const resultOne = await promiseOne;
    console.log("after await promiseOne");
    console.log(resultOne);
    console.log("before await promiseTwo");
    const resultTwo = await promiseTwo;
    console.log("after await promiseTwo");
    console.log(resultTwo);
}

fetchData();
console.log("Hello Gokul");

/*
promiseOne timer start
promiseTwo timer start
before await promiseOne
Hello Gokul
resultTwo resolving
resultOne resolving
after await promiseOne
ResultOne
before await promiseTwo
after await promiseTwo
ResultTwo
*/
\`\`\`

### Error handling:

We can add await inside a try/catch, any error will be caught inside the catch block. Or the .catch method on the async method will also work.

### Async/await vs promise .then/.catch:

Async/await is syntactical sugar over then/catch. Behind the hood, JavaScript is using then/catch. We can avoid the promise chain, we can add the logic after the await line instead of passing a callback. Async/await is a new way of handling promises.

## Fetch:
Fetch returns a promise with a body which is a readable stream. To convert it to JSON, we need to call the '.json()' method. It will be again a promise.

\`\`\`typescript
const data = await fetch(API_URL);
await data.json(); // we can convert to string, text also
\`\`\`

## 5. This keyword

### this in global space:
Global space is space which is outside of any function. Here the value of \`this\` is the global object. In the case of a browser runtime environment, it is a window object, but in the case of Node.js, it is global.
If JS is running in any other runtime, the value of \`this\` will be the global object of that runtime.

\`\`\`typescript
console.log(this); // window for browser, global for node -> global object
\`\`\`

### this inside a function:
The value will be dependent on strict or non-strict mode.

\`\`\`typescript
console.log(this); // undefined in strict mode, window in non-strict mode
\`\`\`

Value of \`this\` keyword inside the function is undefined, but in non-strict mode due to this substitution, \`this\` will get the value of the global object which is window.
Value of \`this\` keyword depends on how a function is called.

\`\`\`typescript
function myFunc() {
    console.log(this);
}
myFunc(); // undefined: in strict mode
// Exception: In non-strict mode, this will be window object
window.myFunc(); // window object: the object that calls the function
\`\`\`

### this inside object’s method:
Method: when a function is a part of an object it is called a method.
The value of \`this\` keyword inside an object’s method will be the object.
The value of \`this\` depends on the object we are calling.

\`\`\`typescript
const obj = {
    name: "Gokul",
    getName: function () {
        console.log(this);
    },
};
obj.getName(); // {name: "Gokul", getName: ƒ}
\`\`\`

### this with call, apply, bind (sharing method between objects):
With Function borrowing, we can call a method with a different object, and the value of \`this\` inside the function will be the object we passed.
With the help of the call method, we can call a function and pass the value of \`this\` as a parameter.

\`\`\`typescript
const obj2 = {
    name: "Gokul",
    getName: function () {
        console.log(this);
    },
};
const obj3 = { name: "Surya" };
obj2.getName.call(obj3); // {name: "Surya"}
\`\`\`

### this inside arrow function:
The value of \`this\` in the case of an arrow function depends on the enclosing lexical context.
Eg: if inside global space -> window, if enclosed in object -> object
Arrow function inside global space + inside normal function + object method -> window
Arrow function inside object method which is a normal function -> object

\`\`\`typescript
const obj4 = {
    name: "Gokul",
    getName: () => {
        console.log(this);
    },
};
obj4.getName(); // window object: arrow function doesn’t have its own this, it takes this from its parent scope

const obj5 = {
    name: "Gokul",
    getName: function () {
        const y = () => {
            console.log(this);
        };
        y();
    },
};
obj5.getName(); // { name: 'Gokul', getName: [Function: getName] }

function x() {
    const y = () => {
        console.log(this);
    };
    y();
}
x(); // window object
\`\`\`

### This inside DOM:
The value of \`this\` inside DOM is the HTML element.

\`\`\`typescript
document.querySelector("button").addEventListener("click", function () {
    console.log(this); // button element
});

document.querySelector("button").addEventListener("click", () => {
    console.log(this); // window object
});
\`\`\`
`;
