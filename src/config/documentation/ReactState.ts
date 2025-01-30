export const ReactState = `
# State Management in React

## 1. useState Hook

### Overview
The useState hook is used to declare state variables in functional components. It's best suited for managing local, component-specific state.

### Example
\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Declare a state variable

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

### Characteristics
- **Benefits:**
  - Simple and straightforward for managing local state
  - Directly tied to component re-renders
- **Limitations:**
  - Only handles component-level state
  - Not suitable for global or deeply nested state management
  - Can lead to prop-drilling if state needs to be shared
- **Recommended For:** Local state within a single component (input values, toggles, counters)

## 2. useReducer Hook

### Overview
The useReducer hook is ideal for managing complex state logic, especially when state depends on multiple actions or needs to be updated in response to various events.

### Example
\`\`\`javascript
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
\`\`\`

### Characteristics
- **Benefits:**
  - Well-suited for complex state logic
  - More predictable state updates
  - Structured action types
- **Limitations:**
  - Can become complex with nested state
  - Overkill for simple state logic
- **Recommended For:** Complex form management, multi-step workflows, state machines

## 3. Context API

### Overview
The Context API is used for global state management, especially for state that needs to be accessible across many levels of the component tree.

### Example
\`\`\`javascript
import React, { useState, useContext, createContext } from 'react';

const CountContext = createContext();

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <ChildComponent />
    </CountContext.Provider>
  );
}

function ChildComponent() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

### Characteristics
- **Benefits:**
  - Provides global state management
  - Avoids prop-drilling
  - No third-party dependencies
- **Limitations:**
  - Performance issues with large-scale apps
  - Re-renders for all consuming components
- **Recommended For:** Small to medium-sized applications

## Context Provider
Any child under Context Provider using context will rerender in case any state update happened in context.

\`\`\`jsx
<GlobalProvider>
    <Child1></Child1>
    <Child2></Child2>
</GlobalProvider>
\`\`\`

If child1 and child2 are using different states in the provider, any change in one will cause rerendering of both.

- When we need to handle a state for a context, we need to add the state inside context and then use it.
- If we add state in the App component, and use it in context, App, context, components inside App, components using contexts all of them rerender.
- If we have a child and we don't want this to rerender until its prop gets changed, use \`React.memo\` on the child.
- We need to split context for different states, in order to avoid rerendering.
- We cannot use a service class singleton object as Global service, since the component will only render when any of the below changes:
    - Props change.
    - State in the component changes.
    - Context values that the component subscribes to change.

## useReducer
\`useReducer\` is similar to \`useState\` but the way we update state is similar to Redux. We can pass an initial value and reducer method which will return state and dispatch method, with which we can dispatch actions, and it will state according to the logic written in the reducer function.

## useRef
\`useRef\` is a React hook that provides a way to hold a mutable reference to a value or a DOM element without causing re-renders when the value changes. This makes it ideal for scenarios where you need to persist some data or directly interact with the DOM, but you don't want React's rendering cycle to be triggered.

- With \`useRef\` we can directly access the DOM element, and outside of React rendering cycle, we can update the DOM.
- If we want to show the changes in ref to UI we need to use \`useState\`.
- Since \`useRef\` is outside of React rendering cycle we can use this for persisting data across rerenders also if we want to directly access DOM and update DOM content by not touching React rendering cycle.

## 4. useRef Hook

### Overview
While useRef is typically used for DOM references, it can also hold mutable state that doesn't trigger re-renders.

### Example
\`\`\`javascript
import React, { useRef } from 'react';

function Timer() {
  const timerRef = useRef(0);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log("Timer running...");
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = 0;
  };

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
}
\`\`\`

### Characteristics
- **Benefits:**
  - Great for mutable values without re-renders
  - Persists values across renders
- **Limitations:**
  - Doesn't trigger re-renders
- **Recommended For:** DOM references, timers, previous value tracking

## 5. External State Management Libraries

### Redux Example
\`\`\`javascript
// actions.js
export const increment = () => ({ type: 'INCREMENT' });

// reducer.js
const initialState = { count: 0 };
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};
\`\`\`

### When to Use External Libraries
- Large-scale applications
- Complex state interactions
- Team collaboration needs
- Performance optimization requirements

CounterComponent.js

\`\`\`javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './actions';

function CounterComponent() {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
        </div>
    );
}
export default CounterComponent;
\`\`\`

### Benefits:
- Scales well for larger apps with complex state requirements.
- Helps avoid prop-drilling and provides a centralized state.

### Limitations:
- Can add additional complexity and boilerplate code.
- Might be overkill for simple apps.

### Recommended For:
- Large-scale applications where managing state across multiple components is necessary.

## Summary of Recommendations
- Use \`useState\` for simple, local component state.
- Use \`useReducer\` when state logic becomes complex and requires multiple actions.
- Use Context API for sharing state between multiple components in small to medium-sized apps.
- Use \`useRef\` for holding values that don’t trigger re-renders, like timers or DOM references.
- For global state management in large applications, consider Redux or other external libraries to handle complex state dependencies and avoid performance issues.

Each method has unique strengths, so choose based on your specific requirements, app scale, and desired reactivity.

## What is "Rendering" in React?
Rendering in React refers to the process of calling the component functions to produce the virtual DOM representation of the UI.

- When a component re-renders, React re-runs the component function (like Parent and Child) to calculate what the UI should look like based on the current state and props.
- Rendering happens in JavaScript memory and produces an updated virtual DOM tree, which is a lightweight copy of the actual DOM.

### Key Takeaways
- **Rendering**: React recalculates the virtual DOM based on the new state/props. This happens in memory.
- **DOM Updating**: React updates only the parts of the actual DOM that changed, based on a diffing process.
- **React’s Efficiency**: By keeping re-renders in memory until changes are necessary in the actual DOM, React minimizes costly DOM manipulations, making updates smoother and faster.

## Redux
In Redux, \`useSelector\` only triggers a re-render when the specific value returned by the selector function changes. This makes it efficient because updates to other properties within the same object (e.g., counter.count when selecting counter.text) will not cause unnecessary re-renders.

### Summary of Re-rendering Behavior

| Method       | Re-rendered Components                                      | Optimization Approach                                      |
|--------------|-------------------------------------------------------------|------------------------------------------------------------|
| Context API  | All components that consume the updated context value       | Use multiple contexts, memoize context value               |
| Redux        | Only components that select or connect to the specific updated slice of the state | Use \`useSelector\` with shallow equality, memoized selectors, split Redux slices |

### In short:
- **Context API**: Triggers re-renders in every component that consumes it when the context value changes, regardless of the specific usage.
- **Redux**: Optimizes re-renders based on which slices of state each component depends on, re-rendering only those subscribed to the updated state.

## Context API

### Context Value Changes:
When the context value changes (e.g., the count property is updated), it triggers a re-render of all components that consume the context value. This is because the context provider has provided a new object reference when the state is updated.

### Re-rendering of Consumers:
In React's Context API:
- Any component that uses \`useContext\` to read the context will re-render when the context provider updates its value, regardless of whether the specific value they are using has changed.
- This behavior is different from how \`useSelector\` works in Redux, where only components subscribed to the specific piece of state that changed will re-render.
`;
