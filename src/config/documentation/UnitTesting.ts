export const unitTesting = `
# Unit Testing with Jest

## What is Unit Testing?

Unit testing is a software testing method where individual units or components of code are tested in isolation. A unit is the smallest testable part of any software, typically a function, method, or class.

### Benefits of Unit Testing
- Early bug detection
- Easier refactoring
- Documentation through tests
- Improved code design
- Increased confidence in code changes

## Jest Testing Framework

Jest is a delightful JavaScript testing framework maintained by Facebook. It's widely used for testing React applications and works great with TypeScript.

### Key Features of Jest
- Zero configuration needed for most JavaScript projects
- Snapshot testing
- Built-in code coverage reports
- Interactive mode for development
- Rich matcher API

## Setting Up Jest

### 1. Installation

\`\`\`bash
# Using npm
npm install --save-dev jest @types/jest

# Using yarn
yarn add --dev jest @types/jest

# Using pnpm
pnpm add -D jest @types/jest
\`\`\`

### 2. Configuration

Create a \`jest.config.js\` file in your project root:

\`\`\`javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
  ],
};
\`\`\`

### 3. Add Test Scripts

Add these scripts to your \`package.json\`:

\`\`\`json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
\`\`\`

## Writing Your First Test

### Basic Test Structure

\`\`\`typescript
// sum.test.ts
import { sum } from './sum';

describe('sum function', () => {
  it('adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('handles negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
\`\`\`

### Common Jest Matchers

\`\`\`typescript
// Common matcher examples
test('common matchers', () => {
  // Exact equality
  expect(2 + 2).toBe(4);

  // Object matching
  expect({ name: 'test' }).toEqual({ name: 'test' });

  // Truthiness
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();

  // Numbers
  expect(4).toBeGreaterThan(3);
  expect(4).toBeLessThan(5);

  // Strings
  expect('team').toMatch(/team/);

  // Arrays
  expect(['apple', 'banana']).toContain('apple');
});
\`\`\`

## Testing React Components

### Example Component Test

\`\`\`typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

## Best Practices

1. **Test Isolation**
   - Each test should run independently
   - Avoid test interdependence
   - Clean up after each test

2. **Naming Conventions**
   - Use descriptive test names
   - Follow the pattern: "should [expected behavior] when [condition]"

3. **Arrange-Act-Assert**
   - Arrange: Set up test data
   - Act: Execute the code being tested
   - Assert: Verify the results

4. **Code Coverage**
   - Aim for meaningful coverage, not just high percentages
   - Focus on critical business logic
   - Use \`npm run test:coverage\` to generate reports

## Common Testing Scenarios

### Asynchronous Tests

\`\`\`typescript
test('async data fetching', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
\`\`\`

### Mocking

\`\`\`typescript
// Mocking a function
const mockFn = jest.fn();
mockFn.mockReturnValue('mocked value');

// Mocking a module
jest.mock('./path/to/module', () => ({
  someFunction: () => 'mocked'
}));
\`\`\`

## Troubleshooting

Common issues and solutions:
- Test environment issues: Check Jest configuration
- Module import errors: Verify moduleNameMapper in config
- Timeout errors: Adjust timeout settings
- Coverage issues: Check collectCoverageFrom settings


# Writing Unit Tests in React

Unit testing is a crucial part of software development that helps ensure individual components work correctly. Here's a comprehensive guide on writing effective unit tests for React components.

## Core Principles of Unit Testing

1. **Isolation**: Test components in isolation from the rest of the application
2. **Deterministic**: Tests should always produce the same result given the same input
3. **Single Responsibility**: Each test should verify one specific behavior
4. **Readable**: Tests should be easy to understand and maintain
5. **Fast**: Unit tests should execute quickly

## Example: Testing a Button Component

Let's look at how to test a button component with different test cases:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';

describe('Button Component', () => {
  // 1. Test Default Rendering
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  // 2. Test Different Variants
  it('renders with outline variant', () => {
    render(<Button variant="outline">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-input');
  });

  // 3. Test User Interactions
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 4. Test Disabled State
  it('respects disabled state', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
\`\`\`

## Test Case Categories

When writing unit tests, consider these categories:

### 1. Rendering Tests
- Test default rendering
- Test with different props
- Test with different children
- Test conditional rendering

### 2. Interaction Tests
- Test click handlers
- Test hover states
- Test keyboard interactions
- Test form submissions

### 3. State Tests
- Test disabled states
- Test loading states
- Test error states
- Test different visual variants

### 4. Edge Cases
- Test with missing props
- Test with empty content
- Test with extreme values
- Test error handling

## Best Practices

1. **Use Semantic Queries**
   - Prefer \`getByRole\` over \`getByTestId\`
   - Use accessible queries that reflect how users interact with your app

\`\`\`typescript
// Good
const button = screen.getByRole('button');

// Less Ideal
const button = screen.getByTestId('my-button');
\`\`\`

2. **Test User Behavior**
   - Focus on testing what the user sees and does
   - Test component behavior, not implementation details

\`\`\`typescript
// Good
it('shows success message after submission', () => {
  render(<Form />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Success!')).toBeInTheDocument();
});

// Bad (testing implementation)
it('sets isSubmitted to true', () => {
  const form = render(<Form />);
  expect(form.instance().state.isSubmitted).toBe(true);
});
\`\`\`

3. **Arrange-Act-Assert Pattern**
   - Arrange: Set up the test conditions
   - Act: Perform the action being tested
   - Assert: Verify the expected outcome

\`\`\`typescript
it('updates label when clicked', () => {
  // Arrange
  render(<ToggleButton initialLabel="Off" />);
  
  // Act
  fireEvent.click(screen.getByRole('button'));
  
  // Assert
  expect(screen.getByText('On')).toBeInTheDocument();
});
\`\`\`

4. **Mock External Dependencies**
   - Mock API calls
   - Mock complex dependencies
   - Mock time-based functions

\`\`\`typescript
it('handles API response', async () => {
  // Mock API call
  jest.spyOn(api, 'getData').mockResolvedValue({ data: 'test' });
  
  render(<DataComponent />);
  await screen.findByText('test');
  
  expect(api.getData).toHaveBeenCalledTimes(1);
});
\`\`\`

## Common Testing Scenarios

### 1. Testing Async Operations
\`\`\`typescript
it('loads data asynchronously', async () => {
  render(<DataList />);
  
  // Test loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(3);
});
\`\`\`

### 2. Testing Form Interactions
\`\`\`typescript
it('validates form input', () => {
  render(<LoginForm />);
  
  const input = screen.getByLabelText('Email');
  fireEvent.change(input, { target: { value: 'invalid' } });
  fireEvent.blur(input);
  
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});
\`\`\`

### 3. Testing Conditional Rendering
\`\`\`typescript
it('shows different content based on props', () => {
  const { rerender } = render(<Toggle show={false} />);
  expect(screen.queryByText('Content')).not.toBeInTheDocument();
  
  rerender(<Toggle show={true} />);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
\`\`\`

Remember: The goal of unit testing is not to achieve 100% code coverage, but to ensure your components behave correctly and catch potential issues early in development.
`;
