describe("e2e to buy a tire with a regular user", () => {
    it("Should performe all the process to buy a tire", () => {
        cy.login();
        cy.clearcart();
        cy.fixture('buy-tire-regular-user').then((data) => {
            cy.get('input[name="searchTerm"]').type(data.brandToSearch + '{enter}');
            cy.get('input[type="number"]', { timeout: 20000 }).first().type('1');
            cy.get('#add-all-to-cart').click();
            cy.get('input[name="OrderNumField"]', { timeout: 5000 }).type(data.orderNumber);
            cy.get('#mui-component-select-PaymentTypeField').click();
            cy.get('#menu-PaymentTypeField ul li').first().click();
            cy.get('table[data-at-prd-list="true"] > tbody > tr', { timeout: 15000 }).should('be.visible');
            
            if(Cypress.expose('env') !== 'prod'){
                cy.get('button[data-at-place-order="true"]').click();
                cy.get('span[data-at-order-number="true"]', {timeout: 15000}).should('be.visible');
            }
        });
    });
});