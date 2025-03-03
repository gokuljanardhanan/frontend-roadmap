export const webWorkers = `
# Web Workers in JavaScript

## What are Web Workers?

Web Workers allow you to run scripts in background threads, separate from the main execution thread. They enable true parallel processing in JavaScript without blocking the UI.

### Benefits
- Run CPU-intensive tasks without blocking the UI
- True parallel processing
- Better performance for heavy computations
- Improved user experience

## Types of Web Workers

1. **Dedicated Workers**
   - Used by a single script
   - Most common type
   - One-to-one relationship with the creator

2. **Shared Workers**
   - Can be accessed by multiple scripts
   - Shared between multiple windows/tabs
   - More complex communication model

3. **Service Workers**
   - Act as proxy servers
   - Enable offline functionality
   - Handle push notifications

## Basic Implementation

### 1. Create a Worker File
\`\`\`typescript
// worker.ts
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

function heavyComputation(data) {
  // Perform intensive calculations
  return result;
}
\`\`\`

### 2. Use the Worker
\`\`\`typescript
// main.ts
const worker = new Worker('worker.ts');

worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

worker.postMessage(dataToProcess);
\`\`\`

## Web Worker Limitations

1. **No DOM Access**
   - Cannot manipulate DOM directly
   - No window object access
   - Limited to computation tasks

2. **Communication Overhead**
   - Data is cloned, not shared
   - Large data transfers can be slow
   - Use TransferableObjects when possible

3. **Limited APIs**
   - No direct access to most Web APIs
   - Cannot use window-dependent functions
   - Limited localStorage access

## Best Practices

1. **When to Use Workers**
   - Heavy mathematical calculations
   - Large array processing
   - Image/video processing
   - Data encryption/decryption

2. **Data Transfer**
   - Use structured cloning when possible
   - Consider TransferableObjects for large data
   - Minimize communication frequency

3. **Error Handling**
\`\`\`typescript
worker.onerror = (error) => {
  console.error('Worker error:', error);
};

worker.onmessageerror = (error) => {
  console.error('Message error:', error);
};
\`\`\`

## Practical Example

Here's a practical example of using a Web Worker for heavy computation:

\`\`\`typescript
// fibonacci.worker.ts
self.onmessage = (e) => {
  const { number } = e.data;
  const result = fibonacci(number);
  self.postMessage({ result });
};

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// main.ts
const fibWorker = new Worker('fibonacci.worker.ts');

fibWorker.onmessage = (e) => {
  const { result } = e.data;
  console.log('Fibonacci result:', result);
};

// This won't block the UI
fibWorker.postMessage({ number: 45 });
\`\`\`

## Implementation in Next.js

In Next.js, you need to handle Web Workers slightly differently due to the build process:

1. **Install Required Package**
\`\`\`bash
pnpm add -D worker-loader
\`\`\`

2. **Configure Next.js**
\`\`\`typescript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
        options: {
          filename: 'static/[hash].worker.js',
          publicPath: '/_next/',
        },
      });
    }
    return config;
  },
};
\`\`\`

3. **Create Type Declaration**
\`\`\`typescript
// worker.d.ts
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}
\`\`\`
`;
