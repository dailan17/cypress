describe('Location demo', function() {
    beforeEach(function(){
        cy.visit('https://www.saucedemo.com/')
    });

    //ejecución de callback function () =>
    it('Should have title Swag Labs', () => {
        cy.title().should('eq', 'Swag Labs')
    });

    //ejecución de callback function function()
    it('URL should be https://www.saucedemo.com/', function() {
        cy.url().should('eq', 'https://www.saucedemo.com/')
    });
    
    it('Should use https', () => {
        cy.location('protocol').should('contains', 'https')
    });

    it('Should have hostname www.saucedemo.com', () => {
        cy.location('hostname').should('eq', 'www.saucedemo.com')
    });

    it('Should login and redirect to inventory page', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.location('pathname').should('eq', '/inventory.html');
    });
});