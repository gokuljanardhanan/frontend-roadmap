export const NamasteJavascript1 = `
1. How JavaScript Works & Execution Context 
Everything in javascript is executed in the Execution context.
Execution context has 2 parts 
1. Memory/variable env : Where every variables and function definition is stored in key value pair
2. Code/Thread of execution : Where code execute line by line
Memory/variable env
Code/Thread of execution
Key:value
A:10
Fn : {}
—---
—---
—---

JS is synchronous single threaded language 
A. Single threaded : Js can execute only one line at a time
B. Synchronous : Js execute in a specific order, one after another, once first line executed then moves to second.
2. How JavaScript Code is executed
var n = 2;
function square(num) {
 var ans = num * num;
 return ans;
}
var square2 = square(n);
var square4 = square(4);

Memory/variable env
Code/Thread of execution
n : undefined
Square : {fn definition}
square2 : undefined
square4 : undefined



Phase 1: Memory allocation: Js engine will go through the entire js code and allocate memory for variables and functions. Here n,square2,square4 variables are added in memory and allocate a special value undefined.
Phase 2: Code execution :In this phase, js engine will go line by line and execute code, It will create a Global execution context. it assigns value 2 to variable n, then it sees a function definition, it will move on to the next line, when the js engine sees a function call it will create an execution context for it. And the same memory allocation and code phases will be done for every execution context and once everything is executed it will delete the execution context.square(n) returns 4 and it will be assigned to square2, and similar memory+code phases run for square(4) function call as well.
Create a global execution context
Execute code line by line
For every function call it will create another execution context and push to call stack and remove once completed the execution for function.
Call stack:
- Call stack is where js execution context is added and executed. 
- Call stack maintains the order of execution of execution contexts.
- Js engine adds execution contexts in call stack for executing code, initially global execution context is created and executed and whenever function call happens, another execution context created and pushed to call stack, once completed delete it, finally global execution context will also get removed from call stack.

Memory/variable env
Code/Thread of execution
n : 2
Square : {fn definition}
square2 : 4
square4 : 16

memory
memory
num: undefined then 2
Ans : undefined then 4




memory
memory
num: undefined then 4
Ans : undefined then 16

























3. Hoisting in JavaScript
The first phase of js execution is memory allocation, the variable will be added to memory and allocate a special value undefined, even before code execution starts all the variables are available in memory with value undefined. This is called hoisting in js.
In the below code, it will print 
Namaste, undefined,definition of function getName


getName();
console.log(x);
console.log(getName);

var x = 7;
Function getName(){
    console.log(‘Namaste’);
}
- If a function is an arrow function and stored in a variable, it will be considered as a variable initially undefined, not function definition.
- If we try to access arrow function before the definition in code, it will throw error.

4.How functions work in JS
In the below example, A variable x is declared in global level, inside function a and b.
- When Global execution context created x got allocated memory initially undefined and then assign 2
- When execution context created for function a , it created its own local memory and allocate memory for x, the same happens for b.
- Console inside function a and b get value of x from its local memory if not found check its lexical scope.
- Output : 10, 100, 1
- Global execution context memory will be a window object in the browser.
- Other function memory will be local until it gets removed from the call stack.
Eg:
var x=1;
a();
b();
function a(){
	var x=10;
	console.log(x);
}
function b(){
	var x=100;
	console.log(x);
}
 
5. SHORTEST JS Program
- The shortest js program is an empty file, even if the js file is empty, the js engine still does its job of creating global execution context , adding to call stack, memory allocation and execution.
- Window(in case of browser) is a global object created along with global execution context, and whenever execution context is created this variable is created. In case of global execution context this=window
- global object in case of node runtime is global.
- Anything written in global space(written outside of any function) is added to global object (window in browser)
- For the rest of the execution contexts other than global a local memory will be created.

var a = 10;
Function b(){
Var x = 10;
}
console.log(a); //10 -> checks in global object
console.log(window.a);  //10
console.log(this.a);  //10 this=window 

6.undefined vs not defined in JS 
Undefined: It's a special value/type in js, when execution context is created for each variable in memory allocation phase javascript engine allocates undefined. Until variable assignment is found, the variable has the value of undefined.
Not defined: This is an error in js, when js engine is unable to find a particular variable in memory(local memory or memory scope).
- Javascript is a loosely/weakly typed language, a variable can have a number initially and then can assign a string, it will not throw any error.

7. Scope chain, Scope & Lexical Environment
Scope : Where js engine can access a specific variable/function. Scope is dependent on the lexical environment.
Lexical environment: Local memory + lexical env of its parent.Whenever a execution context is created, lexical env is also created.All execution contexts get a reference of its parent lexical env.
In example b, function c gets reference of function a lexical env , function a gets reference of Global execution context lexical env, and global execution context lexical env is null.
Scope chain : The process of searching variable in local memory and then its parent lexical env , this chain is called scope chain.
- Js engine first checks local memory, then if a variable is not found, it will check parent local memory and it goes till global memory. If not found in the entire chain , it will throw not defined error,
-A function inside another function will form a closure as well, which will have access to its parent function lexical env.

In the below example the output will be 10, Global execution created + 10 assigned to b in global memory, and execution context created for function a, first it will check for b in local memory if not found it will check global(parent) memory.
A. 
function a(){
   console.log(b); //10
}
var b=10;
a();

B.
function a(){
	c();
	function c(){
   		console.log(b); //10
	}
}
var b=10;
a();

8. let & const in JS Temporal Dead Zone
- let and const variables are hoisted. But these variables are stored not in global objects(in case of global EC), and not in local memory(in case of other EC), but these are stored in different memory locations.And they are in a temporal dead zone until the variable initialization happens in code execution phase.

a. 	console.log(a);
let a;
var b = 100;
In the above example, a will be allocated memory in a different memory with undefined value/value not available, until js engine execute line 2 in code phase, it will be in temporal dead zone, after executing line 2, the variable a gets value of undefined or the value initialized and can be accessible.(let a=2, it gets value 2)
B.	console.log(a);
let a;
var b = 100;
In this example since in line 1 we are accessing a , when it is in a temporal dead zone, cannot access,Error will be thrown -> ReferenceError: a is not defined.

Temporal dead zone:The time between let or const hoisted in memory phase and actually execute variable declaration in code phase.During this time js engine cannot access these variables from that separate memory. Even after the declaration statement is executed the variables will be in the same memory but can be accessible.

3 types of memory:
Global object: Created for global execution context, in browser it is window, variables and functions other than let and const will be stored here.This memory persists until program terminates.If there are objects or data in the global memory that are no longer referenced or needed, the garbage collector can clean them up.The variables and objects referenced will not be deleted until it completes.
Local memory: Created for other execution context for functions, variables and functions other than let and const inside function corresponding to the execution context will be stored here.This EC and Local memory will be deleted(if no closure or variables not used outside) after EC removed from call stack.
Separate memory for let and const : For let and const variables(including functions using declared using let and const) it will store in separate memory cant be accessed until variable declaration/initialization in code phase happens.Even after initialization the value of variables updated in same separate memory. : These variables will be garbage collected after the block execution , but In case of closure, event listener,async operation,and if let and const used at global level, makes it available even after block execution.
Important:
Even if the global execution context is deleted from the call stack, the local memory will not be immediately deleted, since the function can return another function (forms closure) which will have access to local memory variables, until the closure is used, the local memory is not garbage collected. Or if a function returns an object from it, and an outside function is using it, the memory is still needed for the object.
Also js garbage collection runs periodically, even if execution context is deleted, local memory may not be immediately deleted, but periodically.
Global object will be available until program terminates
Local memory for function execution context, garbage collected if variables not referenced outside(closure, event listener, async operation)
Separate memory for let and const will be garbage collected after block execution, if not referenced outside(closure, event listener, async operation, global declaration of let and const)
Memories:
Global EC: Global object + separate memory for let and const
Function EC : Local EC memory + separate memory for let and const inside + lexical env scope

Reference error: when js engine not found the variable in scope

1. 	let a = 10;
var b = 100;
window.a // reference error : let separate memory not in window
window.b // 100

2. 	Var b = 10; 
Var b = 100;
With var redeclaration will not throw an error, but this will not create multiple b in memory, b will update with 100.
3. 	let b = 10; 
let b = 100; // SyntaxError: Identifier 'k' has already been declared
4.	 let p = 100;
var p = 10;  //SyntaxError: Identifier 'p' has already been declared
5.  	var p = 100;
let p = 10;  //SyntaxError: Identifier 'p' has already been declared
- let is strict , it will not allow creating duplicate variable names even if the other one is var or let. Var can have multiple declaration statements for the same variable name.

const : Const is similar to let but it will not allow reassigning values to it, the separate memory hoisting temporal dead zone, all of them remains the same.
1. const a; //Uncaught SyntaxError: Missing initializer in const declaration
2. const a = 10;
    a = 11; //TypeError: Assignment to constant variable.
- Add let and const variable declarations at top of the block to make temporal dead zone time to almost 0, then the case of reference error will not happen. Declaration first logic after that.

Let:
Block Scope Needs: Use let when you need a variable to be restricted to a specific block of code, such as inside a loop or a conditional statement.
Avoiding Hoisting Issues: Use let to avoid issues related to variable hoisting, where a variable is used before it is declared.
Re-declaration Prevention: Use let to prevent re-declaration of variables within the same scope, reducing bugs.

Var:
Function Scope Needs: Use var if you specifically need the variable to be available across the entire function, regardless of block-level structures.
Legacy Code: Use var when maintaining or updating older codebases that heavily rely on it.
Global Scope: var can be used when you need to create a global variable (although let and const can also be used at the top level of scripts to create globals).

9. BLOCK SCOPE & Shadowing in JS
Let and Const has block scope
Block is defined by curly braces({}),This is also called compound statement, it is used to group js statements.This is grouping multiple statements and used where js expects a single statement.
After block, the let and const will be inaccessible, if not referenced(closure,event listener)
Block statements execute in either GEC or Function EC (no separate EC for it) and creates a block memory for let and const.
1.	 {
	var a=1;
let b=2;
	}
console.log(a); 1// var a is in global object
console.log(b); //reference error
Shadowing: In JavaScript, "shadowing" refers to the practice where a variable declared within a certain scope (such as a block or a function) has the same name as a variable declared in an outer scope. When this happens, the inner variable "shadows" the outer variable, making the outer variable inaccessible in that inner scope.

1. In case of var in this example, both of them are belongs to same scope/memory (global object), the same variable value in global object changed to 2.
var a = 1;
{
	var a=2;
	console.log(a); //2
}
console.log(a); //2

2.In this example, var a=1, is in global object, and var a=2 is in local memory of fn function execution context.
var a = 1;
function fn(){
	var a=2;
	console.log(a); //2
}
fn();
console.log(a); //1

3.In case of let here, both will be different memory, let a=1 in separate block memory and let a=2 in separate block memory. Same happens for const as well.
let a = 1;
{
	let a=2;
	console.log(a); //2
}
console.log(a); //1

Illegal shadowing:
1.illegal: here var is crossing boundaries and interfering let , if var is declared inside function it will be legal.
let a =1;
{
 var a=2; //syntax error, identifier a already declared
}

2.legal shadowing
var a =1;
{
 let a=2; //2
}
3.legal shadowing

let a =1;
{
 let a=2; //2
}
4.legal shadowing
var a =1;
{
 var a=2; //2
}

10. Closures
A closure typically involves returning an inner function or somehow preserving it beyond the execution of the outer function, allowing the inner function to retain access to the outer function's scope even after the outer function has completed
- A function along with its lexical environment forms closure.
- Eg: Even after fn completed its execution, since it is returning another function, it allows inner function to
Retain access to outer scope.
- Function returning function, callback of settimeout all these functions which retains the lexical env is called closure function. Even if the function executed outside of its scope, it still remember its lexical env.
function fn(){
 let a = 10;
 debugger;
 return () => {
     debugger;
     console.log(a);
 }
}
const newFn = fn();
newFn();

- The below example is not closure, since after executing fn, the inner function does not retain the outer scope, but it will form a closure when executing the function b. After execution of fn, it won't retain any value.
function fn(){
 let a = 10;
 function b() {
     console.log(a);
 }
 b(); // Immediately calls 'b', no closure here
}
fn();

Uses of closure:
1. Currying
2. Async operation
3.module design pattern
4.memoize
5. Function like once
6.settimeouts
7.iterators

Encapsulation: create private variables that cannot be accessed from outside a function's scope
function createCounter() {
 let count = 0; // Private variable
 return {
   increment() {
     count += 1;
     return count;
   },
   decrement() {
     count -= 1;
     return count;
   },
   getCount() {
     return count;
   }
 };
}
const counter = createCounter();

Function factories: Closures are also useful for creating functions with pre-configured arguments
function createMultiplier(multiplier) {
 return function(number) {
   return number * multiplier;
 };
}


const double = createMultiplier(2);
const triple = createMultiplier(3);


console.log(double(5)); // 10
console.log(triple(5)); // 15



Managing Asynchronous Code: Closures are often used in asynchronous code to maintain access to a specific state at the time of the function's creation, even after the outer function has completed
function fetchData(url) {
 fetch(url)
   .then(response => response.json())
   .then(data => {
     console.log('Data from url:', data);
   })
   .catch(error => {
     console.error('Error fetching data from url:', error);
   });
}
fetchData('https://jsonplaceholder.typicode.com/posts/1');



11.setTimeout + Closures Interview Question
In the below example, js doesn't wait for settimeout to complete, it will move to console.log(‘namaste’), and after 1sec it will execute the callback of settimeout, it will create a closure with its lexical env, getting access to i in function x.
function x(){
var i=1;
 setTimeout(()=>{
     console.log(i);
 },1000);
 console.log('namaste');
}
x();
//namaste
//1 after 1sec

The below code prints 5 5times, since when setTimeout callback executes, it has reference to the same i which is 5 now. To get 0 to 4 as output use let, the settimeout
- When a for loop executes,var i has a scope inside function x, and the callback function of settimeout forms a closure with the same i which is in the function x local memory. After each second when the callback executes it will get the i which will be having the same reference for all callbacks.
- If we use let, which has a block scope , it will create a new i every time when the for loop runs, and each callback creates a closure with a different i reference, so it will print 0 to 4.
function x() {
 for (var i = 0; i < 5; i++) {
   setTimeout(() => {
     console.log(i);// 5 5times change to let for 0 to 4
   }, i * 1000);
 }
 console.log('namaste');
}
x();




function x() {
 for (var i = 0; i < 5; i++) {
   ((x) => {
     setTimeout(() => {
       console.log(x);
     }, i * 1000);
   })(i);
 }
 console.log('namaste');
}
x();



constructor function:
In JavaScript, a constructor function is a special type of function used to create and initialize objects. When invoked with the new keyword, a constructor function sets up a new object, assigns properties, and sets up prototypes. Constructor functions are a way to define a blueprint for creating objects, similar to classes in other programming languages.

In the below example, count is a private variable that cannot be accessed outside, only increment function can update the count value.increment function forms closure with count and lexical env.
function CreateCounter() {
 var count = 0; // Private variable


 this.increment = () => {
   this.count += 1;
 };
}
const counter = new CreateCounter();
counter.increment();

In the below example, it does not form a closure, and the count is available on the object, which is public. Increment is not retaining the count value of create counter function, but accessing public count value from the object.
function CreateCounter() {
 this.count = 0; // Public property


 this.increment = () => {
   this.count += 1;
 };
}
const counter = new CreateCounter();
counter.increment();
console.log(counter.count); // 1

Garbage collector:
Garbage collection in JavaScript is a form of automatic memory management. The JavaScript engine, such as V8 (used in Chrome and Node.js), SpiderMonkey (used in Firefox), or JavaScriptCore (used in Safari), automatically allocates and deallocates memory as needed during the execution of a program. This helps developers avoid memory leaks and manage memory efficiently without having to manually allocate and free memory.

function createLargeObject() {
 let largeObject = { data: new Array(1000000).fill('data') }; // Large object
 return function() {
   console.log(largeObject.data.length);
 };
}
const leakyFunction = createLargeObject(); // Closure holds reference to largeObject
// If leakyFunction is never cleaned up or released, largeObject is never collected.
Mitigating Memory Leaks:
Avoid Unintentional Global Variables: Always use let, const, or var to define variables.
Proper Cleanup: Remove event listeners, clear timers, and handle resources properly.
Manage Closures Carefully: Be cautious with closures that capture large objects or unnecessary references.
Closures allow functions to retain access to their lexical scope, which can lead to increased memory usage if not handled correctly.
Garbage Collection helps manage memory by automatically reclaiming space from unused objects but may struggle with closures that retain references.
Memory Leaks occur when memory is not released due to lingering references, including those caused by closures or other unintended references.
- Closures are garbage collected when they are no longer reachable from any live part of the application. Proper management of closures and awareness of references to captured variables can help ensure that memory is used efficiently and that unnecessary memory retention is minimized.

function outer() {
 let largeObject = { data: new Array(1000000).fill('data') };
 return function inner() {
   console.log(largeObject.data.length);
 };
}
let closure = outer(); // closure retains reference to largeObject
closure = null; // No more references to largeObject
// At this point, if 'outer' is also out of scope, 'largeObject' and the closure can be collected.
In the below example z will be garbage collected since it is not used in inner function, but x is not.
function a (){
 var x=10, z=9;
 return ()=>{
   console.log(x);
 }
}

12. FIRST CLASS FUNCTIONS
Function statement/Function Declaration: The way of creating function using function key word and function definition is called function statement.
During Memory phase function hoisted , with function name and function definition.
Calling function before function statement will not throw an error, since the memory definition is already present.
function a() {
    console.log(‘b called’);
}

Function expression: Function can be treated as a variable, and in a variable we can assign a function.
Assigning function to variable is called function expression
The variable b is hoisted
Calling b before function expression,will throw an error, since b will be having value undefined.
var b = function () {
	    console.log(‘b called’);
}
anonymous function: A function without a name is anonymous function, this is used when functions are used as values
Here function name will not be present 
function () {}
Named function definition: Same as function expression but the function assigning will be having a name.
var b = function a() {
	    console.log(‘b called’);
    console.log(a); //definition of function a
}
b(); //b called
a(); //error
Parameters & arguments:
Arguments : These are passed while calling function.
Parameters: The variables in function definitions which will be local variables, can't access outside.
function a(param1, param2) {}
a("arg1", "arg2");
First class function/First class citizen:The ability to use functions as values is called first class functions
Functions can be passed as an argument of function call
Function can be returned from function

13.Callback Functions in JS ft. Event Listeners
Function is the first class citizen in js, we can pass function as an argument to another function.
In the example below, y is called a callback function.
This is mostly used in asynchronous tasks, a function y is passed to x, and now it's dusty of x to call y when the asynchronous task is completed.
function x(callback) {
}
x(function y(){
})
In case of settimeout, async operation , event listener, callback function is passed, and since js single threaded, synchronous language, it doesnt wait for async operations, it will move the callback functions to que and executes once asynchronous operation is completed. Doesnt block main thread.
Blocking main thread: Heavy operation or logic blocks main thread, any async operation or such operations should be done using callback to unblock.
Below example uses callback function xyz to attach event listener, whenever clicked on button it will call callback function.also it creates a closure which has access to counter. If we go to dev tools -> elements -> select button -> event listener -> this callback function will be shown (xyz) with global and closure scope available.
Closure and event listener will cause memory leak,so always remember to remove unwanted event listener, js will garbage collect it.
function attachEvntListner() {
 let count = 0;
 document.getElementById('btn').addEventListener('click', function xyz() {
   count++;
   console.log('btn clicked');
 });
}

14. Asynchronous JavaScript & EVENT LOOP from scratch
JS is a synchronous single threaded language, it can do one thing at a time, and only after completing one thing it will move to another.
Call stack will be empty and then GEC is added to it, memory allocation phase allocates memory for function a , on code execution phase, it sees a function call, function execution context for a is created, and pushed to callstack, after consoling ‘a’, the EC deleted, and GEC console ‘end’.Now even GEC removed, callstack will be empty.
Call stack is inside JS engine, js engine is inside browser
Browser provides some super power like storage, timer, dom api, console to js engine.
All these super powers are provided through global object which is window
function a() {
 console.log('a');
}
a();
console.log('end');

- In the below example, start is printed in console, console is a super power given by browser through window object. The setTimeout callback function is registered at web api env, and starts a timer at the browser, now prints end in the console. Once 1sec is completed, the callback function is pushed to the callback queue, and the event loop checks if the call stack is empty and anything present in the callback queue.If call stack is empty it will push the callback function of settimeout and execute, after complete remove from call stack.
console.log('start');
setTimeout(() => {
 console.log('timeout');
}, 1000);
console.log('end');



Event loop: Job of event loop is to monitor call stack and checks callback queue, if call stack is empty push callback to call stack. It check microtask queue first and finish everything, and once only it is empty it will check callback and execute callbacks in it.
Callback queue: there can be multiple callbacks(event listener, settimeout) available, and whenever it has to execute it first push to callback and event loop based on priority and order push to call stack
Microtask queue:Similar to callback queue but has higher priority. Promises, mutation observer(checks dom for mutation) These are the callbacks pushed to microtask queue
Starvation: When there are multiple callbacks are in microtask queue and the callback inside callback queue does not get a chance to push to call stack and execute, this is called starvation.
	
	- If we have settimeout of 5sec, we cannot guarantee that the callback will execute right after 5sec, it will minimum take 5sec, and only when call stack is empty the callback execute.If main thread has millions of lines of code which takes 10sec, the callstack will be free after 10sec, settimout callback execute after 10sec.

15. JS Engine EXPOSED
- v8 is the js engine in chrome, nodejs. All js engines need to follow ECMAscript standards.ECMAscript is the governing body for js.
- Spidermonkey is the first js engine developed by the founder of js.Mozilla firefox uses this engine.
- Js engine is a software, v8 is written in c++.
Below are working together to run js code.
Js runtime environment
Js engine (v8 for chrome, nodejs)
API
Event loop
MS Queue
Callback Queue 
	JS engine workflow:

	Code -> parsing -> compilation -> executing 
Js engine takes code and parse it and creates tokens
The code is converted into Abstract syntax tree (https://astexplorer.net/)
Interpreter : Goes line by line and execute, doesn't know what happens in next line. (faster)
Compiler : Whole code compile before execution, optimized code is generated(efficient)
       - JS engine initially was using interpreter, since it runs in browser, it cant wait for entire code to compile and run, but modern browser uses mixture of both compiler and interpreter, which is called JIT(just in time) Compiler. The job of compiler is to optimize as much as possible before execution. The code which will execute later will be taken by compiler and optimize it.
- Now this optimized byte code is given for execution
- Memory heap : where all the variables are stored
- Call stack : where EC created and code executed
- GC : Clearing unwanted variables from memory using mark and sweep algo.
Mark-and-Sweep: The garbage collector marks reachable objects starting from the root (e.g., global object). Once it has marked all reachable objects, it sweeps through memory and collects unmarked objects.
Jobs of compiler : Inlining , copy ellison, inline caching
V8 interpreter : ignition
V8 compiler : turbo fan
V8 is the current faster js engine

15. Higher-Order Functions ft. Functional Programming
A function which takes another function as argument or a function which returns another function is called a higher order function.

const radius = [1,2,3];
const area = function (radius) {
 return Math.PI * radius * radius;
};
const circumference = function (radius) {
 return 2 * Math.PI * radius;
};
const diameter = function (radius) {
 return 2 * radius;
};
Array.prototype.calculate = function (logic) {
 const output = [];
 for (let i = 0; i < this.length; i++) {
   output.push(logic(this[i]));
 }
 return output;
};
console.log(radius.calculate(area));
console.log(radius.calculate(circumference));
console.log(radius.calculate(diameter));


16. Map, filter, reduce
All 3 are higher order functions, which accepts function as argument.
Map:
Map method accepts a callback function and loops through each item in the array and executes a callback for items and returns a new array.
const arr = [1, 2, 3, 4];
const out = arr.map((item)=>{return item*2});

Filter: Filter method loop through each items, and accepts a callback, and filter values based on the condition in callback.
const arr = [1, 2, 3, 4];
const out = arr.filter((item)=>{return item>2});

Reduce: Reduce method loop through each item, and accepts a callback and initial value,, and generate a single value from the value returned by callback


`;
