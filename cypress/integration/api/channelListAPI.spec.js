/// <reference types="cypress" />

describe("API channel list endpoint", () => {
	beforeEach(() => {
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

	it("checks that there is a table with some channels after logging in", () => {
		cy.request({
			method: "GET",
			url: "http://localhost:3000/api/channelList",
			// body: {
			// 	name: "aUser",
			// 	password: "badPass",
			// },
			// failOnStatusCode: false,
		}).then(function (response) {
			// expect(response.body).to.deep.equal({ message: "User not allowed" });
			expect(response.status).to.equal(200);
		});
	});
});
