// Extend Cypress commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

// Custom command for login
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="username"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

export {};
