export const GarbageCollector = `
# Garbage Collection and Memory Leaks in JavaScript

## Introduction
JavaScript, being a high-level, interpreted language, has automatic memory management through garbage collection (GC). Garbage collection ensures that memory used by objects that are no longer needed is reclaimed, helping to avoid memory leaks and improve performance. However, improper handling of memory in JavaScript can lead to memory leaks, where memory is not properly released, causing applications to slow down and, in extreme cases, crash.
This documentation explains how garbage collection works in JavaScript, how memory leaks occur, and best practices to avoid them.

## Garbage Collection in JavaScript
Garbage collection in JavaScript is an automatic process that removes objects from memory that are no longer in use, allowing the system to reuse that memory. JavaScript uses a mark-and-sweep algorithm to manage this process.

### Key Concepts

#### Reachability
An object is reachable if it can still be accessed through any chain of references from a root (global objects, active function calls, etc.).
If an object becomes unreachable, it is considered eligible for garbage collection.
Example: When a variable goes out of scope or when an object is removed from the DOM but still referenced in JavaScript.

#### Heap vs Stack
- **Heap**: JavaScript stores objects (arrays, functions, and other non-primitive data) in the heap. The heap is used for dynamic memory allocation.
- **Stack**: Stores function execution contexts and primitive values (e.g., numbers, booleans). When the function call finishes, stack memory is automatically cleaned up.

#### Strong vs Weak References
- **Strong Reference**: A direct reference to an object. An object with a strong reference will not be garbage collected.
- **Weak Reference**: A reference that does not prevent an object from being garbage collected. WeakMap, WeakSet, and WeakRef allow creating weak references.

#### Mark-and-Sweep Algorithm
- **Marking Phase**: The garbage collector marks all reachable objects by starting from root objects (global variables, active functions, etc.).
- **Sweeping Phase**: The garbage collector then sweeps through the heap and clears objects that are no longer marked (unreachable objects).

#### Generational Garbage Collection
JavaScript engines (e.g., V8) often divide the heap into multiple generations:
- **Young Generation**: Newly allocated objects. These objects are likely to be short-lived.
- **Old Generation**: Objects that have survived multiple garbage collection cycles.
- **Minor GC**: Cleans up the young generation more frequently.
- **Major GC**: Cleans up the old generation less frequently, as these objects tend to be long-lived.

### How Garbage Collection Works in Practice

#### When is Garbage Collection Triggered?
Garbage collection is generally triggered when memory usage is high, or when the JavaScript engine detects that the heap is full.
The garbage collector runs in the background and pauses the main thread to free up memory.

#### Impact on Performance
Garbage collection can cause pauses in the execution, which may affect performance if it occurs too frequently or takes too long.
There are two types of GC pauses:
- **Minor GC**: Short pauses caused by cleaning up young generation objects.
- **Major GC (Full GC)**: Longer pauses caused by cleaning up old generation objects.

## Memory Leaks in JavaScript
A memory leak occurs when the program consumes more memory than necessary because objects are not properly garbage collected. This happens when references to objects are kept alive even though they are no longer needed, preventing them from being removed from memory.

### Common Causes of Memory Leaks

#### Event Listeners Not Removed
If event listeners are added to DOM elements but not removed when the element is no longer needed, they can prevent garbage collection of the associated DOM elements.
Example:
\`\`\`javascript
window.addEventListener('scroll', handleScroll);
\`\`\`
This listener will keep a reference to the handleScroll function, potentially preventing garbage collection of the function or DOM elements.
Solution: Remove event listeners when no longer needed:
\`\`\`javascript
window.removeEventListener('scroll', handleScroll);
\`\`\`

#### Uncleared Intervals or Timeouts
If intervals or timeouts are not cleared after use, they can keep references to variables or DOM elements, preventing them from being garbage collected.
Solution: Always clear intervals and timeouts when no longer needed:
\`\`\`javascript
const interval = setInterval(() => { /* do something */ }, 1000);
clearInterval(interval);
\`\`\`

#### Global Variables or Closures
Global variables or closures that hold references to objects can prevent the garbage collector from freeing up memory.
Solution: Avoid using global variables, and ensure closures are cleaned up when no longer needed.

#### Detached DOM Elements
If a DOM element is removed from the document but is still referenced in JavaScript, it cannot be garbage collected.
Solution: Ensure DOM elements are properly dereferenced when removed from the DOM.

#### Circular References
Circular references occur when two objects reference each other, preventing both from being garbage collected.
Solution: Be mindful of circular references and use structures like WeakMap to avoid keeping objects alive unnecessarily.

#### React Component State or References
Storing large objects in React state or referencing DOM elements improperly can lead to memory leaks.
Solution: Use cleanup functions in useEffect to cancel asynchronous operations and manage state properly:
\`\`\`javascript
useEffect(() => {
    const interval = setInterval(() => { /* do something */ }, 1000);

    return () => clearInterval(interval); // Cleanup
}, []);
\`\`\`

## Best Practices to Prevent Memory Leaks in JavaScript
- **Clean Up Event Listeners**: Remove event listeners that are no longer needed, especially those attached to global objects like window or document.
- **Clear Intervals and Timeouts**: Always clear intervals and timeouts using clearInterval or clearTimeout once they are no longer needed.
- **Nullify References**: Explicitly set references to null when no longer required, especially for large objects or DOM elements that might be removed.
- **Use Weak References**: Use WeakMap, WeakSet, or WeakRef to store references to objects that you don’t need to keep alive for the entire lifecycle of the program.
- **Avoid Circular References**: Be cautious of circular references between objects, which can prevent garbage collection. Use weak references to break the cycle when necessary.
- **Use React useEffect Cleanup**: In React, use the cleanup function in useEffect to remove event listeners, clear intervals, and cancel asynchronous operations when the component unmounts.
- **Monitor Memory Usage**: Use browser tools (like Chrome DevTools) to take heap snapshots and analyze memory usage. This helps detect potential memory leaks and excessive memory usage.

## Tools for Monitoring Garbage Collection and Memory Leaks

### Chrome DevTools
- The Memory tab in Chrome DevTools allows you to profile memory usage, take heap snapshots, and detect memory leaks.
- Use the Timeline or Performance tab to analyze garbage collection pauses and their impact on performance.

### V8 Inspector (Node.js)
- In Node.js, the --inspect flag can be used to monitor memory usage and garbage collection activities with Chrome DevTools.

### Heap Snapshots
- Heap snapshots can be taken to visualize memory allocations, detect retained objects, and understand memory consumption patterns.

## Conclusion
Understanding and managing garbage collection and memory leaks is crucial for building high-performance JavaScript applications. By following best practices like cleaning up event listeners, clearing intervals, nullifying references, and using weak references, you can ensure efficient memory usage and avoid memory leaks that could impact your application’s performance.
With the tools available for monitoring memory usage and garbage collection (like Chrome DevTools), you can proactively detect and address memory issues, leading to a more stable and responsive application.

`;
