export const coreJsFundamentals = `
# Core JS Fundamentals

## 1. call, apply and bind method in JavaScript

### Function borrowing: 
We can borrow a function from one object and use it with another object.

#### Call: 
We can borrow a function from an object or a normal function with the help of the call method. We need to pass an object which will be the value of \`this\` inside the function. Second, third, and rest of the parameters we can pass to the function and use.

**Case 1: borrowing a function from another object**

\`\`\`javascript
let name = {
    firstname: "Gokul",
    lastname: "janardhanan",
    printFullName: function () {
        console.log(this.firstname + " " + this.lastname);
    },
};
name.printFullName(); // Gokul janardhanan

let name2 = {
    firstname: "Surya",
    lastname: "b p",
};
name.printFullName.call(name2); // Surya b p
\`\`\`

**Case 2: borrowing a function from a normal function**

\`\`\`javascript
let name3 = {
    firstname: "Gokul",
    lastname: "janardhanan",
};

const printFullName = function () {
    console.log(this.firstname + " " + this.lastname);
};

printFullName.call(name3); // Gokul janardhanan

let name4 = {
    firstname: "Surya",
    lastname: "b p",
};

printFullName.call(name4); // Surya b p
\`\`\`

#### Apply:
Apply method is similar to call, used for function borrowing, but the way we pass parameters is different. In the apply method, we have to pass parameters in the array as the second parameter. The first parameter is the reference of \`this\` keyword.

\`\`\`javascript
let name3 = {
    firstname: "Gokul",
    lastname: "janardhanan",
};

const printFullName = function (hometown, state) {
    console.log(
        this.firstname + " " + this.lastname + " from " + hometown + ", " + state
    );
};

printFullName.apply(name3, ["Banglore", "Karnataka"]); // Gokul janardhanan

let name4 = {
    firstname: "Surya",
    lastname: "b p",
};

printFullName.apply(name4, ["Chennai", "Tamilnadu"]); // Surya b p
\`\`\`

#### Bind:
Bind is similar to call, it borrows a function, but the difference is that it doesn't call the function immediately instead it returns a function.

\`\`\`javascript
let name7 = {
    firstname: "Gokul",
    lastname: "janardhanan",
};

const printFullName7 = function (hometown, state) {
    console.log(
        this.firstname + " " + this.lastname + " from " + hometown + ", " + state
    );
};

const newFn = printFullName7.bind(name7, "Banglore", "Karnataka"); 
newFn();

let name8 = {
    firstname: "Surya",
    lastname: "b p",
};
const newFn1 = printFullName7.bind(name8, "Chennai", "Tamilnadu"); 
newFn1(); // Surya b p
\`\`\`

## 2. Function Currying
Making a copy of a function and create more methods out of it by presetting some arguments.

### Using bind
\`\`\`javascript
const multiply = (a, b) => a * b;

const multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(5)); // 10

const multiplyByThree = multiply.bind(this, 3);
console.log(multiplyByThree(5)); // 15
\`\`\`

### Using closure
\`\`\`javascript
const multiplyFn = (a) => (b) => {
    return a * b;
};

const multiplyByTwoFn = multiplyFn(2);
console.log(multiplyByTwoFn(5)); // 10

const multiplyByThreeFn = multiplyFn(3);
console.log(multiplyByThreeFn(5)); // 15
\`\`\`

## 3. sum(1)(2)(3)()
\`\`\`javascript
const sum = (a) => {
    return (b) => {
        return b ? sum(a + b) : a;
    };
};
\`\`\`

### 4. Prototype and Prototypal Inheritance in Javascript

Js attach a prototype object to every object/array. That's how we are able to access hidden properties and methods. In js everything is an object. The prototype of an array is Array prototype and its parent prototype is object prototype. Object prototype parent is null.

\`\`\`javascript
const arr = [];
// Since js attach a prototype, in the case of array, it has access to properties like length, and methods like map, filter.
arr.__proto__ = Array.prototype;
arr.__proto__.__proto__ = Object.prototype;
arr.__proto__.__proto__.__proto__ = null;
\`\`\`

The prototype is a chain every type in js ends up an object prototype and later on top of the chain its null. When we are accessing properties or methods js first check the object and then check its prototype and go till null in the prototype chain and get property and methods.

**Case 1: Array prototype**

\`\`\`javascript
const arr = [1, 2, 3, 4];
// arr.length -> 4
\`\`\`

**Case 2: Object prototype**

\`\`\`javascript
const obj = { name: "John", age: 30 };
// obj.hasOwnProperty('name') -> true
\`\`\`

**Case 3: Function prototype**

\`\`\`javascript
function fun() {
    console.log("Hello");
}
// fun.name -> fun
\`\`\`

### 5. Event Bubbling, Capturing aka Trickling in Javascript

**Event Bubbling:** is the phase where the event starts from the target element and then propagates up through its ancestors in the DOM hierarchy until it reaches the root of the document.

**Event Capturing:** (or "trickling") is the phase where the event starts from the root of the document and propagates down to the target element. In this phase, event handlers for the event type are executed from the outermost ancestors down to the target element.

- Events will propagate from root to element and element to root, but we can register event listeners on capture phase or bubble phase by passing a third parameter.
- As per standard events will always propagate top to bottom then bottom to top.
- By default the third parameter is false, use capture, which means events will bubble up.

**Output:** child clicked, parent clicked, grandparent clicked

- If we set the third parameter as true, the event will be registered on the captured phase.

**Output:** grandparent clicked, parent clicked, child clicked

\`\`\`javascript
document.getElementById("one").addEventListener("click", function () {
    console.log("one");
}, true); // use capture, false by default, events will bubble up
\`\`\`

**Stoppropagation:** in the event object, we can call this method to stop propagation of event. From top to target (capturing) and target to top (bubbling), based on where we have registered event listener we can call Stoppropagation method and event will stop propagating.

- In the below example, if we click on child element, it won't propagate to parent element, only child click will be printed.

\`\`\`javascript
document.getElementById("one").addEventListener("click", function () {
    console.log("one");
}, false);

document.getElementById("two").addEventListener("click", function () {
    console.log("two");
}, false);

document.getElementById("three").addEventListener("click", function (e) {
    console.log("three");
    e.stopPropagation();
}, false);
\`\`\`

### 6. Event Delegation in Javascript

Event delegation exists since event bubbling exists. If we have multiple child elements in which we need to add an event listener, instead of adding multiple event listeners to children, it's better to add a single event listener to the parent element. Since in js event bubbling happens, the parent also notified on child click.

**Advantages:**
- Reduce memory, reduce event listener
- Less code
- DOM manipulation

Some events are not bubbled up, like window resize.

### 7. Debouncing in Javascript

Debouncing an event/api call is executed only when the delay between any 2 events is higher than the threshold value we set.

- In the example below, the getdata is called only when keyup events time difference is higher than 300ms.
- When a keyup event triggered, it will call a setTimeout and after 300ms it will call getdata, but during this 300ms if any other event triggered, it again clear the setTimeout and create a new setTimeout, so when there are no other events in 300ms gap it will call get data.

**Example:**

\`\`\`javascript
const getData = () => {
    console.log("called getdata");
};

const debouncedGetData = (fn, delay) => {
    let timer;
    return function (...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

const betterFn = debouncedGetData(getData, 300);

document.getElementById("name").addEventListener("keyup", betterFn, false);
\`\`\`

### 8. Throttling in Javascript

Throttling calls api call/do something in an interval, even if multiple events triggered, with throttling we can rate limit the number of api calls/function calls made.

- When an event is triggered, call the method and set a flag as true, mark this flag only after a particular delay with the help of setTimeout. With this next time the event is triggered, if it is below the delay gap, the flag will be false with no api calls made. After delay again the flag is true and calls are made. And again flag set as false.

**Example:**

\`\`\`javascript
const getData = () => {
    console.log("called getdata");
};

const throttlingGetData = (fn, delay) => {
    let flag = true;
    return function (...args) {
        if (flag) {
            fn.apply(this, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, delay);
        }
    };
};

const betterFn = throttlingGetData(getData, 300);

document.getElementById("name").addEventListener("keyup", betterFn, false);
\`\`\`

### 9. CORS

When a cross origin request is made, browser blocks the request with cors error. Browser first calls a preflight request to server, and server respond with cors headers like Access-Control-Allow-Origin, method, etc. If preflight request is success, an original request is made to server. Browser decides whether a request is a simple request or a request needs preflight and based on that send preflight request.

### 10. Async/Defer

**Normal script tag:** When html parsing happens, when it encounters a script tag, it will request for the script through the network, and execute the script, these 2 steps stop HTML parsing. Downloading + running js block html parsing.

**Async script:** When html parsing happens, when it encounters a script tag with async, it will download the script parallel to html parsing. But script execution blocks html parsing. Downloading parallel to html parsing. Js execution blocks html parsing.

**Defer script:** When html parsing happens, when it encounters a script tag with defer, it will download the script parallel, and execute script only after html parsing is completed. Download script in parallel to html parsing. Script execution after html parsing.

**Uncovered:**
- Developing food ordering app
- Thinking recursively
- Zigzag
- Local storage vs session storage

[How to crack FE interview](https://www.youtube.com/watch?v=VHnILgmErM4&list=PLlasXeu85E9fkCH4XgL2GEh0Bd1IHEaGL)
`;
