import { getForceAction } from '../support/utils';
describe('BOTBC - Corporate Admin', () => {
    beforeEach(() => {
        cy.login('admin');
        cy.visit(Cypress.expose('baseUrl'));
        cy.acceptAllCookies();
        cy.preventOneTrustOverlay();
        cy.get('li > a[href="/Account/Search"]', { timeout: 20000 }).should('be.visible').click();
        cy.url({ timeout: 10000 }).should('include', '/Account/Search');
    });

    it('Should search a store by Store number', () => {
        const expectedValue = Cypress.expose('stores')[0].number;

        cy.get('#StoreNumber').clear().type(expectedValue, getForceAction());
        cy.get('#form-account-search-store button[type="submit"]').smartClick();

        cy.get('#storeResults', { timeout: 20000 }).should('be.visible');
        cy.get('input[type="hidden"][name="id"]', { timeout: 20000 }).should('have.attr', 'value', expectedValue);
    });

    it('Should search a user by username', () => {

        const expectedValue = Cypress.expose('users')[0].username;

        cy.get('#UserName').clear().type(expectedValue, getForceAction());
        cy.get('#form-account-search-user button[type="submit"]').smartClick();

        cy.get('#userResults', { timeout: 20000 }).should('be.visible');
        cy.get('a.showuser', { timeout: 20000 })
            .should(($el) => {
                expect($el.text().trim()).to.equal(expectedValue);
            });
    });
});
