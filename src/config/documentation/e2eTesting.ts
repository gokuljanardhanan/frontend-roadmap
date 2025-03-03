export const e2eTesting = `
# End-to-End Testing with Cypress

## What is E2E Testing?

End-to-End (E2E) testing is a methodology used to test an application's flow from start to finish. It simulates real user scenarios and tests the application in a production-like environment.

### Benefits of E2E Testing
- Validates complete user workflows
- Tests integration between components
- Ensures critical paths work as expected
- Catches issues that unit tests might miss
- Simulates real user behavior

## Setting Up Cypress

### 1. Installation

\`\`\`bash
# Using npm
npm install --save-dev cypress @testing-library/cypress

# Using yarn
yarn add --dev cypress @testing-library/cypress

# Using pnpm
pnpm add -D cypress @testing-library/cypress
\`\`\`

### 2. Configuration

Create \`cypress.config.ts\` in your project root:

\`\`\`typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
\`\`\`

### 3. Add Scripts to package.json

\`\`\`json
{
  "scripts": {
    "cypress": "cypress open",
    "cypress:headless": "cypress run",
    "e2e": "start-server-and-test dev http://localhost:3000 cypress"
  }
}
\`\`\`

## Writing Your First E2E Test

Here's an example testing a login flow:

\`\`\`typescript
// cypress/e2e/auth/login.cy.ts
describe("Login Page", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/login");
  });

  it("displays login form", () => {
    // Check if main elements are present
    cy.get("h2").should("contain", "Sign in to your account");
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("shows validation errors for empty form submission", () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check for required field validation
    cy.get('input[name="username"]:invalid').should("exist");
    cy.get('input[name="password"]:invalid').should("exist");
  });

  it("handles successful login", () => {
    // Fill in the form
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("password123");
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Verify successful login (adjust based on your app's behavior)
    cy.url().should("include", "/dashboard");
    cy.get('[data-testid="user-menu"]').should("exist");
  });
});
\`\`\`

## Best Practices

### 1. Page Objects
Organize your tests using the Page Object pattern:

\`\`\`typescript
// cypress/support/pages/login.page.ts
class LoginPage {
  visit() {
    cy.visit("/login");
  }

  getUsernameInput() {
    return cy.get('input[name="username"]');
  }

  getPasswordInput() {
    return cy.get('input[name="password"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  login(username: string, password: string) {
    this.getUsernameInput().type(username);
    this.getPasswordInput().type(password);
    this.getSubmitButton().click();
  }
}

export const loginPage = new LoginPage();
\`\`\`

### 2. Custom Commands
Create reusable commands for common actions:

\`\`\`typescript
// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="username"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

export {};
\`\`\`

### 3. Data Management
Use fixtures for test data:

\`\`\`typescript
// cypress/fixtures/users.json
{
  "validUser": {
    "username": "testuser",
    "password": "password123"
  }
}

// In your test
cy.fixture("users").then((users) => {
  cy.login(users.validUser.username, users.validUser.password);
});
\`\`\`

## Common Testing Scenarios

### 1. Testing Navigation

\`\`\`typescript
describe("Navigation", () => {
  it("navigates through main sections", () => {
    cy.visit("/");
    
    cy.get('[data-testid="nav-docs"]').click();
    cy.url().should("include", "/docs");
    
    cy.get('[data-testid="nav-roadmap"]').click();
    cy.url().should("include", "/roadmap");
  });
});
\`\`\`

### 2. Testing Forms

\`\`\`typescript
describe("Registration Form", () => {
  it("handles form submission", () => {
    cy.visit("/register");
    
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    
    cy.get('button[type="submit"]').click();
    
    cy.get('[data-testid="success-message"]')
      .should("exist")
      .and("contain", "Registration successful");
  });
});
\`\`\`

### 3. Testing API Interactions

\`\`\`typescript
describe("API Interactions", () => {
  it("handles API errors gracefully", () => {
    // Intercept API call and force an error
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" }
    }).as("loginRequest");
    
    cy.visit("/login");
    cy.get('input[name="username"]').type("wronguser");
    cy.get('input[name="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();
    
    // Wait for API call and verify error message
    cy.wait("@loginRequest");
    cy.get('[data-testid="error-message"]')
      .should("exist")
      .and("contain", "Invalid credentials");
  });
});
\`\`\`

## Tips for Effective E2E Testing

1. **Test Critical Paths First**
   - Focus on user journeys that are most important
   - Test common user workflows
   - Prioritize revenue-critical features

2. **Keep Tests Isolated**
   - Each test should be independent
   - Clean up state between tests
   - Don't rely on the state from previous tests

3. **Handle Asynchronous Operations**
   - Use \`cy.wait()\` judiciously
   - Prefer waiting for specific elements or network requests
   - Use aliases for network requests

4. **Maintain Test Data**
   - Use fixtures for test data
   - Reset database between tests if needed
   - Use test environment with predictable data

Remember: E2E tests are slower and more brittle than unit tests, so use them strategically for critical user paths rather than trying to test everything.
`;
