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

  it("handles login attempt", () => {
    // Fill in the form
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // You can add assertions based on your login logic
    // For example, checking if it redirects or shows success message
    // cy.url().should('include', '/dashboard')
  });
});
