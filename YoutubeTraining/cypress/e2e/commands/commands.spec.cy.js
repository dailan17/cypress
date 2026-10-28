describe('Commands example', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('Success login test', () => {
        cy.log('Test');
        cy.typeLogin('standard_user','secret_sauce');
        cy.get('.title').should('contain.text', 'Products');
        cy.logout();
        cy.url().should('eq', 'https://www.saucedemo.com/');

    });

    it('Fail login test', () => {
        cy.typeLogin('standard_user', 'DummyPassword');
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
        
    });

    // it('Logout test', () => {
    //     cy.logout();
    // });
});