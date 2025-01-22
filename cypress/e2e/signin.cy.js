describe("Signin Page Test", () => {
  beforeEach(() => {
    // Visit the signin page before each test
    cy.visit("/signin");
  });

  it("should load the page with all necessary fields visible", () => {
    // Verify that the email input is visible
    cy.get('input[name="email"]').should("be.visible");

    // Verify that the password input is visible
    cy.get('input[name="password"]').should("be.visible");

    // Verify that the submit button is visible
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should display errors for empty fields", () => {
    // Submit the form without filling any fields
    cy.get('button[type="submit"]').click();

    // Verify that the error messages are displayed
    cy.contains("E-mail requis").should("be.visible");
    cy.contains("Mot de passe requis").should("be.visible");
  });

  it("should display an error for invalid email format", () => {
    // Fill out the email field with an invalid email
    cy.get('input[name="email"]').type("test@");

    // Fill out the password field
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the error message for invalid email is displayed
    cy.contains("E-mail invalide").should("be.visible");
  });

  it("should display an error message for authentication failure", () => {
    // Intercept the API request for signin with an error response
    cy.intercept("POST", "/api/auth/signin", {
      statusCode: 401,
      body: { message: "Email ou mot de passe incorrect" },
    }).as("signinRequest");

    // Fill out the email field with a valid email
    cy.get('input[name="email"]').type("testuser@example.com");

    // Fill out the password field with an incorrect password
    cy.get('input[name="password"]').type("wrongpassword");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the error message is displayed
    cy.contains("L'adresse email ou le mot de passe est incorrect");
  });

  it("should successfully sign in with valid credentials", () => {
    // Fill out the email field with a valid email
    cy.get('input[name="email"]').type("j.szigeti1993@gmail.com");

    // Fill out the password field with a valid password
    cy.get('input[name="password"]').type("azertyuiop");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the user is redirected to the homepage or dashboard
    cy.url().should("not.include", "/signin");
  });
});
