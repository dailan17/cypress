import { getForceAction } from '../support/utils';
describe('BOTBC - Resources', () => {
    beforeEach(() => {
        cy.login('admin');
        cy.visit(Cypress.expose('baseUrl'));
        cy.acceptAllCookies();
        cy.preventOneTrustOverlay();
        // Expand an choose My Account
        cy.contains('#nav li.has-sub > a span', 'Resources', { timeout: 20000 }).should('be.visible').click();
    });

    it('Should display Main', () => {
        cy.contains('#nav a span', 'Main', { timeout: 20000 }).should('be.visible').parent().click();
        cy.get('#tbl-resources', { timeout: 20000 }).should('exist').and('be.visible');

        //Add Directory
        cy.get('a.add-directory-modaal', { timeout: 20000 }).should('be.visible').smartClick();
        cy.get('.rsc-title-lbl', { timeout: 20000 }).should('be.visible').and('contain.text', 'Add Directory');

        // cy.acceptAllCookies();
        cy.get('#modaal-close', { timeout: 20000 }).should('be.visible').smartClick();

        //Rename Directory
        cy.get('a[href*="/Resource/RenDirectory/"]', { timeout: 20000 }).contains('Rename Directory').should('be.visible').smartClick();
        cy.get('.rsc-title-lbl', { timeout: 20000 }).should('be.visible').and('contain.text', 'Rename Directory');
        cy.get('#modaal-close', { timeout: 20000 }).should('be.visible').smartClick();

        //Add File
        cy.get('a[href*="/Resource/EditFile?"]', { timeout: 20000 }).contains('Add File').should('be.visible').smartClick();
        cy.get('.rsc-title-lbl', { timeout: 20000 }).should('be.visible').and('contain.text', 'Create File');
        cy.get('#modaal-close', { timeout: 20000 }).should('be.visible').smartClick();
    });
});