/// <reference types="cypress" />

describe("SLacktastic Homepage", () => {
	const username = Cypress.env("username");
	const password = Cypress.env("password");

	beforeEach(() => {
		if (!username || !password) {
			throw new Error(
				"Username and password should be set in cypress.env.json"
			);
		}
		cy.visit("http://localhost:3000/");
		cy.get(".getStartedButton").click();
	});

	it("has two input fields for logging in", () => {
		// assert:
		cy.get("#username").should("exist");
		cy.get("#password").should("exist");
	});

	// it("should show an error when no username provided", () => {
	// 	// action:
	// 	cy.get("#username").clear();
	// 	cy.get(".loginButton").click();
	// 	// assert:
	// 	cy.get("#username").should("exist");
	// });

	it("submits login form after entering name and password", () => {
		// action:
		cy.get("input:first")
			.should("have.attr", "placeholder", "Enter your username")
			.type(username);
		cy.get("input:last")
			.should("have.attr", "placeholder", "Enter your password")
			.type(password);
		cy.get(".loginButton").click();

		// assert:
		cy.get(".table").should("exist");
	});
});

// describe("user can't submit login form without entering username and password", function () {
// 	it("displays form validation", function () {
// 		cy.visit("http://localhost:3000/");
// 		cy.contains(".loginButton").click();
// 		// cy.url().should("include", "/login");
// 		cy.get("input:first").type("opps").clear(); // clear out username
// 		cy.get("input:last").type("opps").clear(); // clear out password
// 		cy.get("form").submit();
// 		cy.get(".error").should("contain", "invalid name");
// 	});
// });
