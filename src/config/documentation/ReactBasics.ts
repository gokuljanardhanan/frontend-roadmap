export const ReactBasics = `
# React Basics

## What is React and its Purpose
React is a JavaScript library used for building user interfaces, mainly for single-page applications.
It allows us to build UI components that manage their state and update efficiently with data changes.
The core concept of React is that it encourages a component-based approach, where each part of the UI is split into reusable, self-contained components.

## JSX (JavaScript XML)
JSX is a syntax extension that allows writing HTML structures in JavaScript code.
It makes it easier to visualize the component structure and is compiled into JavaScript during the build process.

\`\`\`jsx
const element = <h1>Hello, World!</h1>;
\`\`\`

JSX can use JavaScript expressions inside curly braces {} and allows you to dynamically render content:

\`\`\`jsx
const user = "Alex";
const greeting = <h1>Hello, {user}!</h1>;
\`\`\`

## Components and Types (Functional and Class Components)
Components are the building blocks of any React application and can be thought of as JavaScript functions or classes that return JSX to define a part of the UI.

### Functional Components
Introduced as simpler, stateless components, they were initially just functions that accepted props and returned JSX.
With Hooks (like useState, useEffect), functional components can now also manage state and lifecycle events.

\`\`\`jsx
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

### Class Components
Older method of creating components. They can manage state and lifecycle methods (like componentDidMount, componentWillUnmount).

\`\`\`jsx
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
\`\`\`

## Props and State

### Props (short for “properties”)
Used to pass data from a parent component to a child component.
Props are read-only and cannot be modified by the child component.

\`\`\`jsx
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

### State
A way to manage data within a component that can change over time, affecting the component’s rendering.
Functional components use useState to handle state, whereas class components use this.state.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
\`\`\`

## Event Handling
In React, handling events is similar to handling events in regular DOM elements, but the syntax differs slightly.
Event handlers are camelCase (onClick, onChange), and we usually pass a function reference instead of a string.

\`\`\`jsx
function ClickButton() {
    function handleClick() {
        alert('Button was clicked!');
    }
    return <button onClick={handleClick}>Click Me</button>;
}
\`\`\`

## Conditional Rendering
React allows us to render different elements or components based on conditions using JavaScript expressions.
We can use if statements, the ternary operator, or logical && to conditionally render elements.

\`\`\`jsx
function UserGreeting(props) {
    if (props.isLoggedIn) {
        return <h1>Welcome back!</h1>;
    }
    return <h1>Please sign in.</h1>;
}
\`\`\`

## Lists and Keys
When rendering lists, React requires a unique key for each item to efficiently update items in the list.
The key helps React identify which items have changed, added, or removed.

\`\`\`jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li key={number.toString()}>{number}</li>
);
\`\`\`

## Forms in React
Forms in React use controlled components where the form data is handled by the component’s state.
This ensures that React is in control of the form inputs and can update them as the user types.

\`\`\`jsx
function FormExample() {
    const [value, setValue] = useState('');
    
    function handleChange(event) {
        setValue(event.target.value);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        alert('Submitted value: ' + value);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}
\`\`\`

Controlled components in forms are a core React concept where React controls the form's input values through state. In this approach, the component’s state becomes the “single source of truth” for input fields, which means that the form fields’ values are managed by the React component’s state rather than by the DOM alone.

### Example of a Controlled Component
Imagine a text input field where users enter their name. In a controlled component, you’d:
- Use React state to store the input value.
- Bind the input’s value to this state.
- Update the state whenever the user types in the input (using the onChange event).

### Why Use Controlled Components?
- **Single Source of Truth**: The state (e.g., name) in your component is always the definitive source of the input’s value. This makes the input predictable and easy to manage.
- **React-Driven Logic**: With control over the input value, you can conditionally alter it based on additional logic, validation, or formatting.
- **Easy Form Management**: It becomes straightforward to validate inputs, enable or disable fields, or reset the form since all inputs are controlled through state.

## Lifecycle Methods (Class Components) and Hooks (Functional Components)

### Lifecycle Methods
For class components, React provides lifecycle methods such as:
- **componentDidMount()**: Called after the component is initially rendered.
- **componentDidUpdate()**: Called after updates to props or state.
- **componentWillUnmount()**: Called before the component is removed from the DOM.

### Hooks (Functional Components)
With hooks, functional components can mimic these lifecycle stages.
- **useEffect**: Runs side effects; acts as componentDidMount, componentDidUpdate, and componentWillUnmount all in one.

\`\`\`jsx
useEffect(() => {
    console.log("Component mounted or updated");

    return () => {
        console.log("Component will unmount");
    };
}, []);
\`\`\`

## Context API and Prop Drilling
Prop Drilling occurs when data is passed through many nested levels, which can make the code hard to maintain.

### Context API
React’s Context API allows us to avoid prop drilling by providing a way to share values across components without passing props through every level.

\`\`\`jsx
const UserContext = React.createContext();

function App() {
    return (
        <UserContext.Provider value="Gokul Janardhanan">
            <ComponentTree />
        </UserContext.Provider>
    );
}

function ComponentTree() {
    return (
        <UserContext.Consumer>
            {(value) => <p>Username: {value}</p>}
        </UserContext.Consumer>
    );
}
\`\`\`

## React Router (for routing)
React Router is used to manage navigation within a React application.
It provides various components, like BrowserRouter, Route, Switch, and Link, that help manage URL-based navigation.

\`\`\`jsx
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </Router>
    );
}
\`\`\`

## React’s Virtual DOM and Reconciliation

### Virtual DOM
React uses a virtual DOM to optimize updates, creating a lightweight copy of the actual DOM.

### Reconciliation
When state changes, React compares the updated virtual DOM with the previous version to calculate the minimum number of changes required. It then updates only the necessary parts of the real DOM, leading to performance improvements.

## 13. Uncontrolled Components
Unlike controlled components, where form data is controlled by React state, uncontrolled components rely on the DOM to keep track of the input values.
To access values in uncontrolled components, React uses refs (short for references), which allow you to directly access the DOM element without binding the state to the input field.
Here’s an example of an uncontrolled component using ref:

\`\`\`typescript
import React, { useRef } from 'react';

function UncontrolledForm() {
    const inputRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Submitted value: ' + inputRef.current.value);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
}
\`\`\`

Here, \`inputRef.current.value\` provides the current value of the input field.

## 14. React Fragments
React Fragments allow you to group multiple elements without adding extra nodes to the DOM.
This is useful when you need to return multiple components or elements from a component but don’t want them to be wrapped in a \`div\` or other HTML tag.
You can use either the \`<React.Fragment></React.Fragment>\` or the shorthand syntax \`<></>\`.

\`\`\`typescript
function ItemList() {
    return (
        <>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </>
    );
}
\`\`\`

The fragment syntax does not add extra nodes, keeping the DOM clean.

## 15. Higher-Order Components (HOCs)
A Higher-Order Component is a function that takes a component as input and returns a new component.
HOCs are used to reuse component logic across multiple components. They’re commonly used for functionalities like authorization checks, logging, or data fetching.

Example:

\`\`\`typescript
function withLogging(WrappedComponent) {
    return function WrappedWithLogging(props) {
        console.log("Rendering component with props:", props);
        return <WrappedComponent {...props} />;
    };
}

const EnhancedComponent = withLogging(MyComponent);
\`\`\`

## 16. React Memoization with React.memo and useMemo
React.memo is a higher-order component that memoizes functional components, preventing unnecessary re-renders if the props haven’t changed.

\`\`\`typescript
const MyComponent = React.memo(function MyComponent({ name }) {
    console.log("Rendering MyComponent");
    return <div>Hello, {name}</div>;
});
\`\`\`

useMemo is a hook that memoizes a computed value, only recalculating it when its dependencies change. It’s useful for avoiding heavy calculations on every render.

\`\`\`typescript
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

## 17. Error Boundaries
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, preventing the app from crashing.
Only class components can be error boundaries. They implement the \`componentDidCatch\` lifecycle method and are typically used to display fallback UIs.

Example:

\`\`\`typescript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.log("Caught an error:", error, info);
    }
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

// Usage:
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>
\`\`\`

## 18. Lazy Loading and Code Splitting
Code Splitting allows large apps to load code on-demand to improve performance. React provides \`React.lazy\` and \`Suspense\` for this.
\`React.lazy\`: Dynamically imports a component, loading it only when it’s needed.
\`Suspense\`: Provides a fallback UI while the component is being loaded.

\`\`\`typescript
import React, { Suspense } from 'react';
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}
\`\`\`

## 19. Reconciliation and React’s Diffing Algorithm
React’s reconciliation process compares the virtual DOM with a snapshot of the previous virtual DOM to determine the minimal changes needed to update the real DOM.
Keys in Lists: By providing unique keys to list elements, React can quickly identify items that have changed, added, or removed, optimizing the reconciliation process.

## 20. Strict Mode
\`React.StrictMode\` is a tool for highlighting potential problems in your application.
It helps with identifying unsafe lifecycle methods, checking for legacy string refs, and more.
This mode doesn’t affect the production build but gives helpful warnings in development.

\`\`\`typescript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
\`\`\`

## 21. Portals
Portals allow you to render components outside of their parent component hierarchy.
This is especially useful for things like modals or tooltips where the rendered component needs to appear at a different place in the DOM but still be logically connected to the component tree.

Example:

\`\`\`typescript
import ReactDOM from 'react-dom';

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className="modal">{children}</div>,
        document.getElementById('modal-root')
    );
}
\`\`\`

## 22. Custom Hooks
Custom hooks let you extract and reuse component logic in functional components.
If you find yourself repeatedly using the same logic (e.g., fetching data, managing form state), a custom hook allows you to encapsulate that logic into a reusable function.

Example of a simple custom hook:

\`\`\`typescript
import { useState, useEffect } from 'react';

function useFetchData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data));
    }, [url]);

    return data;
}

// Usage in a component
function MyComponent() {
    const data = useFetchData("https://api.example.com/data");
    return <div>{data ? data : "Loading..."}</div>;
}
\`\`\`

## 23. AbortController
AbortController is a web API that allows you to cancel (abort) ongoing requests, such as fetch calls. It works by creating a signal that can be attached to requests, and you can trigger this signal to abort the request, which is especially useful when working with asynchronous operations in React.

Here's a breakdown of how it works:

### Create an AbortController:
AbortController provides an \`abort()\` method to cancel requests, along with a \`signal\` property that we can attach to fetch or other async tasks.

\`\`\`typescript
const controller = new AbortController();
const signal = controller.signal;
\`\`\`

### Attach the Signal to Fetch:
When we make a fetch request, we pass the signal as an option. This allows the fetch request to listen to that signal and stop if it receives an abort signal.

\`\`\`typescript
fetch("https://jsonplaceholder.typicode.com/todos", { signal });
\`\`\`

### Abort the Request:
In the \`useEffect\` cleanup function, we call \`controller.abort()\` to cancel the request. This prevents the request from completing if the component is unmounted or the effect is re-triggered (such as in Strict Mode).

\`\`\`typescript
return () => {
    controller.abort(); // Abort the fetch on cleanup
};
\`\`\`

### Handle Abort Errors Gracefully:
When a request is aborted, it throws an \`AbortError\`. By catching this specific error, we can prevent it from showing up as a regular error. It’s ignored, as it’s expected behavior.

\`\`\`typescript
.catch((error) => {
    if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
    }
});
\`\`\`

### Why Use AbortController?
- **Avoid Memory Leaks**: When a component unmounts but an async operation like fetch is still ongoing, the resolved or rejected promise may try to update the state of an unmounted component. Aborting the fetch prevents this.
- **Optimize Performance**: In development, React’s Strict Mode intentionally runs certain effects twice, which can cause multiple fetches. AbortController lets us stop the redundant one, reducing network load and keeping data handling clean.
`;
