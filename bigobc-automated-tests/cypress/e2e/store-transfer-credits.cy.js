describe('BOTBC - Store transfers & Credits', () => {
    beforeEach(() => {
        cy.login('admin');
        cy.visit(Cypress.expose('baseUrl'));
        cy.acceptAllCookies();
        cy.preventOneTrustOverlay();
    });

    it('Should display Store transfers & Credits', () => {
        //Transfers
        cy.get('a[href="/TransferCredit"]').click();
        cy.get('div.tabs > h2').should('contains.text', 'Store Transfers & Credits');

        //Transfer requests
        cy.get('li > a[href="/TransferCredit/TransferHistory"]').click();
        cy.get('ul.history-tabs').should('be.visible').and('exist');

        //Transfer errors
        cy.get('a[href="/TransferCredit/TransferErrors"]').click();
        cy.get('table.standard').should('be.visible').and('exist');

    });
});