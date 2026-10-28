describe('BOTBC - Change of store', () => {
    beforeEach(() => {
        cy.login('admin');
        cy.visit(Cypress.expose('baseUrl'));
        cy.acceptAllCookies();
        cy.preventOneTrustOverlay();
    });

    it('Should change of store', () => {
        cy.get('a.js-editStore').click();
        cy.get('input.store-number').should('be.visible').clear().type(Cypress.expose('stores')[0].number + '{enter}');
        cy.get('span.store-number').should('contains.text', Cypress.expose('stores')[0].number);
    });
});