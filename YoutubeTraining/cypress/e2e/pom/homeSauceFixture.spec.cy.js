import homeSaucePage from "../../pages/saucedemo/homeSaucePage";
import inventoryPage from "../../pages/saucedemo/inventoryPage";

const tests = require("../../fixtures/data-driven/sauceUsers.json");

describe('Home sauce Demo', () =>{
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    tests.forEach(test => {
        it(test.name, () => {
            homeSaucePage.typeUsername(test.username);
            homeSaucePage.typePassword(test.password);
            homeSaucePage.clickLogin();
            if(test.name == "Should login to inventory page"){
                inventoryPage.elements.titleSpan().should('have.text', test.expected);
            }
            else{
                homeSaucePage.elements.errorMessager().should('have.text', test.expected);
            }
        })
    })
});