describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });
  it("displays register form", () => {
    cy.get("h2").should("contain", "Create your account");
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });
});
