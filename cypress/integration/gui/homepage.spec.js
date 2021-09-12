/// <reference types="cypress" />

describe("SLacktastic Homepage", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("displays the homepage intro and correct title", () => {
		// assert:
		cy.title().should("eq", "Slacktastic");
		cy.get(".introMessage h1").should(
			"include.text",
			"CYF Slacktastic dashboard"
		);
	});

	it("contains three buttons", () => {
		// assert:
		cy.get(".buttonsContainer").eq(0).should("contain", "Admin");
		cy.get(".buttonsContainer").first().should("contain", "Mentor");
		cy.get(".buttonsContainer").last().should("contain", "Trainee");
	});

	it("takes user to login page", () => {
		// action:
		cy.get(".buttonsContainer").click();

		// assert:
		cy.get(".login-group").should("exist");
	});
});
