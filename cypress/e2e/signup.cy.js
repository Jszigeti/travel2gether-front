describe("Signup Test", () => {
  it("should sign up a new user", () => {
    // Visit signup page
    cy.visit("/signup");

    // Verify that the URL includes /signup
    cy.url().should("include", "/signup");

    // Fill out the signup form
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("User");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="passwordmatch"]').type("password123");

    // Submit the signup form
    cy.get('button[type="submit"]').click();

    // Fill out the profile info form
    cy.get('input[type="file"]').attachFile("avatar.png");
    cy.get('div[data-cy="votre genre"]').click();
    cy.get('input[data-cy="Masculin"]').click();
    cy.get('div[data-cy="votre genre"]').click();
    cy.get('input[data-cy="birthdate"]').type("1990-01-01");
    cy.get('textarea[name="description"]').type("This is a test user.");
    cy.get('div[data-cy="vos centres d\'intérêt"]').click();
    cy.get('input[data-cy="Nature"]').click();
    cy.get('input[data-cy="Technologies"]').click();
    cy.get('input[data-cy="Histoire"]').click();
    cy.get('div[data-cy="vos centres d\'intérêt"]').click();
    cy.get('div[data-cy="vos langues parlées"]').click();
    cy.get('input[data-cy="Français"]').click();
    cy.get('input[data-cy="Anglais"]').click();
    cy.get('div[data-cy="vos langues parlées"]').click();

    // Submit the profile info form
    cy.get('button[type="submit"]').click();

    // Fill out the profile preferences form
    cy.get('div[data-cy="vos types de voyages"]').click();
    cy.get('input[data-cy="Aventure"]').click();
    cy.get('input[data-cy="Culturel"]').click();
    cy.get('input[data-cy="Détente"]').click();
    cy.get('div[data-cy="vos types de voyages"]').click();
    cy.get('div[data-cy="votre budget"]').click();
    cy.get('input[data-cy="Moyen"]').click();
    cy.get('div[data-cy="votre budget"]').click();
    cy.get('div[data-cy="vos préférences d\'hébergement"]').click();
    cy.get('input[data-cy="Hotel"]').click();
    cy.get('input[data-cy="AirBnb"]').click();
    cy.get('div[data-cy="vos préférences d\'hébergement"]').click();
    cy.get('input[name="availableFrom"]').type("2024-01-01");
    cy.get('input[name="availableTo"]').type("2024-12-31");
    cy.get('div[data-cy="vos durées de voyage"]').click();
    cy.get('input[data-cy="Court (moins de 3 jours)"]').click();
    cy.get('input[data-cy="Moyen (3 à 7 jours)"]').click();
    cy.get('div[data-cy="vos durées de voyage"]').click();

    // Submit the profile preferences form
    cy.get('button[type="submit"]').click();

    // Verify that the user is redirected to the signin page
    cy.url().should("include", "/signin");
    cy.contains("Profil complété avec succès, merci de valider votre compte !");
  });

  it("should display an error message if email already exists", () => {
    // Visit signup page
    cy.visit("/signup");

    // Verify that the URL includes /signup
    cy.url().should("include", "/signup");

    // Fill out the signup form
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("User");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="passwordmatch"]').type("password123");

    // Submit the signup form
    cy.get('button[type="submit"]').click();
    // Verify that the user is staying on the signup page
    cy.url().should("include", "/signup");
    cy.contains("L'adresse email est déjà utilisée");
  });

  it("should display an error message if email is not valid", () => {
    // Visit signup page
    cy.visit("/signup");

    // Verify that the URL includes /signup
    cy.url().should("include", "/signup");

    // Fill out the signup form
    cy.get('input[name="email"]').type("testuser");
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("User");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="passwordmatch"]').type("password123");

    // Submit the signup form
    cy.get('button[type="submit"]').click();
    // Verify that the user is staying on the signup page
    cy.url().should("include", "/signup");
    cy.contains("E-mail invalide");
  });

  it("should display an error message if passwords do not match", () => {
    // Visit signup page
    cy.visit("/signup");

    // Verify that the URL includes /signup
    cy.url().should("include", "/signup");

    // Fill out the signup form
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("User");
    cy.get('input[name="password"]').type("password12");
    cy.get('input[name="passwordmatch"]').type("password123");

    // Submit the signup form
    cy.get('button[type="submit"]').click();
    // Verify that the user is staying on the signup page
    cy.url().should("include", "/signup");
    cy.contains("Les mots de passe doivent correspondre");
  });

  it("should display an error message if passwords are too short", () => {
    // Visit signup page
    cy.visit("/signup");

    // Verify that the URL includes /signup
    cy.url().should("include", "/signup");

    // Fill out the signup form
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="firstname"]').type("Test");
    cy.get('input[name="lastname"]').type("User");
    cy.get('input[name="password"]').type("passwor");
    cy.get('input[name="passwordmatch"]').type("passwor");

    // Submit the signup form
    cy.get('button[type="submit"]').click();
    // Verify that the user is staying on the signup page
    cy.url().should("include", "/signup");
    cy.contains("Au moins 8 caractères");
  });
  it("should display errors messages if inputs are empty", () => {
    // Visit signup page
    cy.visit("/signup");

    // Verify that the URL includes /signup
    cy.url().should("include", "/signup");

    // Submit the signup form
    cy.get('button[type="submit"]').click();
    // Verify that the user is staying on the signup page
    cy.url().should("include", "/signup");
    cy.contains("E-mail requis");
    cy.contains("Prénom requis");
    cy.contains("Nom requis");
    cy.contains("Mot de passe requis");
    cy.contains("Confirmation du mot de passe requise");
  });
});
