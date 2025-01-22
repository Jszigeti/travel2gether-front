describe("Group Creation Test", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/signin");

    // Fill out the login form
    cy.get('input[name="email"]').type("j.szigeti1993@gmail.com");
    cy.get('input[name="password"]').type("azertyuiop");

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Verify that the user is redirected to the homepage or dashboard
    cy.url().should("not.include", "/signin");

    // Open the navigation menu
    cy.get("[data-cy=toggle-nav-button]").click();

    // Click on the "Create Group" button
    cy.get('a[href="/group/create"] > button').eq(1).click();
  });

  it("should create a new group successfully", () => {
    // Fill out the group creation form
    cy.get('input[type="file"]').attachFile("group-cover.jpg");
    cy.get('input[name="title"]').type("Test Group");
    cy.get('textarea[name="description"]').type("This is a test group.");
    cy.get('input[name="location"]').eq(1).type("Paris");
    cy.get('input[name="dateFrom"]').type("2024-01-01");
    cy.get('input[name="dateTo"]').type("2024-12-31");

    // Submit the group creation form
    cy.get('button[type="submit"]').eq(2).click();

    // Verify that the group is created successfully and a confirmation message appears
    cy.contains("Groupe créé avec succès !");

    // Fill out the group preferences form
    cy.get('div[data-cy="un type de voyage"]').eq(2).click();
    cy.get('input[data-cy="Aventure"]').click();
    cy.get('input[data-cy="Randonnée"]').click();
    cy.get('div[data-cy="un type de voyage"]').eq(2).click();
    cy.get('div[data-cy="un type d\'hébergement"]').click();
    cy.get('input[data-cy="Hotel"]').click();
    cy.get('input[data-cy="AirBnb"]').click();
    cy.get('div[data-cy="un type d\'hébergement"]').click();
    cy.get('div[data-cy="un genre"]').click();
    cy.get('input[data-cy="Mixte"]').click();
    cy.get('div[data-cy="un genre"]').click();
    cy.get('div[data-cy="une langue"]').click();
    cy.get('input[data-cy="Français"]').click();
    cy.get('input[data-cy="Anglais"]').click();
    cy.get('div[data-cy="une langue"]').click();
    cy.get('div[data-cy="un budget"]').click();
    cy.get('input[data-cy="Moyen"]').click();
    cy.get('div[data-cy="un budget"]').click();
    cy.get('div[data-cy="une tranche d\'âge"]').click();
    cy.get('input[data-cy="18-25"]').click();
    cy.get('input[data-cy="25-35"]').click();
    cy.get('div[data-cy="une tranche d\'âge"]').click();

    // Submit the group preferences form
    cy.get('button[type="submit"]').eq(2).click();

    // Verify that the group is created successfully and a confirmation message appears
    cy.contains("Info du groupe mises à jour avec succès !");
  });

  it("should display an error message if the group name is empty", () => {
    // Leave the group name field empty and fill out other fields
    cy.get('input[type="file"]').attachFile("group-cover.jpg");
    cy.get('textarea[name="description"]').type("This is a test group.");
    cy.get('input[name="location"]').eq(1).type("Paris");
    cy.get('input[name="dateFrom"]').type("2024-01-01");
    cy.get('input[name="dateTo"]').type("2024-12-31");

    // Submit the group creation form
    cy.get('button[type="submit"]').eq(2).click();

    // Verify that the error message for the empty group name is displayed
    cy.contains("Nom du groupe requis").should("be.visible");
  });
});
