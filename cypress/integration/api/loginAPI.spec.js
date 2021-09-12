/// <reference types="cypress" />

describe("API login endpoint", () => {
	it("checks error message when invalid credentials used", () => {
		cy.request({
			method: "POST",
			url: "http://localhost:3000/api/login",
			body: {
				name: "aUser",
				password: "badPass",
			},
			failOnStatusCode: false,
		}).then(function (response) {
			expect(response.body).to.deep.equal({ message: "User not allowed" });
			expect(response.status).to.equal(401);
		});
	});
	it("checks successful response when valid credentials used", () => {
		const username = Cypress.env("username");
		const password = Cypress.env("password");
		cy.request({
			method: "POST",
			url: "http://localhost:3000/api/login",
			body: {
				name: username,
				password: password,
			},
		}).then(function (response) {
			expect(response.body).to.deep.equal({ token: true });
			expect(response.status).to.equal(200);
		});
	});
});
