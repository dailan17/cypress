// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {

    const session = { username: Cypress.expose('username'), password: Cypress.expose('password') };

    cy.session(['login', session.username], () => {
        cy.visit(Cypress.expose('siteUrl'));

        // Pasamos las credenciales mediante la opción "args" y las recibimos desestructuradas en el callback
        cy.origin(Cypress.expose('ssoUrl'), { args: session }, ({ username, password }) => {
            cy.get("#username").type(username);
            cy.get("#password").type(password);
            cy.get("#kc-login").click();
        });
    });
});

Cypress.Commands.add('clearcart', () => {
    cy.visit(Cypress.expose('siteUrl'));
    cy.get("#addCartIcon", { timeout: 10000 }).click();
    cy.get("#clearCart", { timeout: 10000 }).should("be.enabled").click();
});



//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })