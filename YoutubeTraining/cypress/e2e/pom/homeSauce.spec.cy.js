import homeSaucePage from "../../pages/saucedemo/homeSaucePage";
import inventoryPage from "../../pages/saucedemo/inventoryPage";

describe('POM Implementation', () =>{
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    it('Should login to inventory page', () => {
        homeSaucePage.typeUsername('standard_user');
        homeSaucePage.typePassword('secret_sauce');
        homeSaucePage.clickLogin();
        inventoryPage.elements.titleSpan().should('have.text', 'test');
    });

    it('Should display locked out error message', () => {
        homeSaucePage.typeUsername('locked_out_user');
        homeSaucePage.typePassword('secret_sauce');
        homeSaucePage.clickLogin();
        homeSaucePage.elements.errorMessager().should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('Should display incorrect username message', () => {
        homeSaucePage.typeUsername('dummy_user');
        homeSaucePage.typePassword('secret_sauce');
        homeSaucePage.clickLogin();
        homeSaucePage.elements.errorMessager().should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Should display incorrect password message', () => {
        homeSaucePage.typeUsername('standard_user');
        homeSaucePage.typePassword('dummy_password');
        homeSaucePage.clickLogin();
        homeSaucePage.elements.errorMessager().should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });
})