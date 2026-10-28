describe("First e2e test", () => {

    beforeEach(function () {
        cy.login();
        cy.clearcart();
    });

    it("Should search a tire on TBC Online", () => {
        cy.fixture('first-e2e').then((data) => {
            cy.get('input[name="searchTerm"]').type(data.brandToSearch + '{enter}');
        });

    });

    it('Should login on TBC Online', () => {
        cy.fixture('first-e2e').then((data) => {
            cy.get('input[name="searchTerm"]').type(data.brandToSearch + '{enter}');
        });
    });

    // it('should execute an e2e test', () => {
    //     cy.visit(Cypress.expose('siteUrl'));
    //     cy.origin(Cypress.expose('ssoUrl'), () => {
    //         cy.get("#username").type(Cypress.expose('username'));
    //         cy.get("#password").type(Cypress.expose('password'));
    //         cy.get("#kc-login").click();
    //         cy.fixture('first-e2e').then(data => {
    //             cy.get("#username").type(Cypress.expose('username'));
    //             cy.get("#password").type(Cypress.expose('password'));
    //             cy.get("#kc-login").click();
    //         });
    //     });
    // });
})