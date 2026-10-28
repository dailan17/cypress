import { getForceAction } from '../support/utils';

describe('BOTBC - My Account', () => {
    beforeEach(() => {
        cy.login('admin');
        cy.visit(Cypress.expose('baseUrl'));
        cy.acceptAllCookies();
        cy.preventOneTrustOverlay();


        // Expand an choose My Account
        cy.contains('#nav li.has-sub > a span', 'My Account', { timeout: 20000 }).should('be.visible').click();
    });

    it('Should display Order History', () => {
        cy.get('#nav a[href="/Cart/OrderHistory"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Order History').click(getForceAction());
        cy.get('h3.divider', { timeout: 40000 }).should('be.visible').and('contain.text', 'Order History');
        cy.get('table.order-history tbody', { timeout: 20000 }).then(($tbody) => {
            if ($tbody.text().includes('No orders found')) {
                cy.wrap($tbody).find('li').should('contain.text', 'No orders found');
            } else {
                cy.wrap($tbody).find('tr.divider').its('length').should('be.greaterThan', 0);
            }
        });
    });

    it('Should redirect to Ebill direct website', () => {
        cy.contains('#nav a span', 'Ebill Direct', { timeout: 20000 })
            .should('be.visible')
            .parent()
            .should('have.attr', 'href')
            .and('include', 'onlinebillpay.tbccorp.com/BigO');
    });

    it('Should display Sales Reporting section & subreports', () => {
        // Sales Entry
        cy.get('#nav a[href="/RetailSales/AddSalesEntry"]', { timeout: 20000 }).should('be.visible').click(getForceAction());
        cy.get('form[action="/RetailSales/AddSalesEntry"]', { timeout: 20000 }).should('exist').and('be.visible');
        cy.log('Add sales entry: OK');

        // Add Inventory
        cy.get('a[href="/RetailSales/AddInventory"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Add Inventory').click(getForceAction());
        cy.get('form[action="/RetailSales/AddInventory"]', { timeout: 20000 }).should('exist').and('be.visible');
        cy.log('Add inventory: OK');

        if (Cypress.expose('targetEnv') !== 'qa') {
            // Sales Search
            cy.get('a[href="/RetailSales/SearchSales"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Sales Search').click(getForceAction());
            cy.get('form[action="/RetailSales/EditSalesSelect"]', { timeout: 20000 }).should('exist').and('be.visible');
            cy.log('Sales Search: OK');

            // Inventory search
            cy.get('a[href="/RetailSales/SearchInventory"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Inventory Search').click(getForceAction());
            cy.get('form[action="/RetailSales/EditInventorySelect"]', { timeout: 20000 }).should('exist').and('be.visible');
            cy.log('Inventory Search: OK');
        }

        // Reports
        cy.get('a[href="/RetailSales/Reports"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Reports').click(getForceAction());
        cy.get('a[href="/RetailSales/ReportsSearch?reportType=ConsolidatedRetailSales"]', { timeout: 20000 }).should('exist').and('be.visible').and('contain.text', 'Consolidated Retail Sales');
        cy.log('Reports: OK');

        if (Cypress.expose('targetEnv') !== 'qa') {
            // Reports - Consolidated Retail Sales
            cy.get('a[href="/RetailSales/ReportsSearch?reportType=ConsolidatedRetailSales"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Consolidated Retail Sales').click(getForceAction());
            cy.url().should('include', 'reportType=ConsolidatedRetailSales');

            // Reports - Consolidated Retail Sales (Raw Data Export)
            cy.go('back');
            cy.get('a[href="/RetailSales/ReportsSearch?reportType=ConsolidatedRetailSalesRawData"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Consolidated Retail Sales (Raw Data Export)').click(getForceAction());
            cy.url().should('include', 'reportType=ConsolidatedRetailSalesRawData');

            // Reports - Consolidated Retail Sales by Month
            cy.go('back');
            cy.get('a[href="/RetailSales/ReportsSearch?reportType=ConsolidatedRetailSalesByMonth"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Consolidated Retail Sales by Month').click(getForceAction());
            cy.url().should('include', 'reportType=ConsolidatedRetailSalesByMonth');

            // Reports - Stores Not Reporting Sales
            cy.go('back');
            cy.get('a[href="/RetailSales/ReportsSearch?reportType=StoresNotReportingSales"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Stores Not Reporting Sales').click(getForceAction());
            cy.url().should('include', 'reportType=StoresNotReportingSales');

            // Reports - Tire Stocking
            cy.go('back');
            cy.get('a[href="/RetailSales/ReportsSearch?reportType=TireStocking"]', { timeout: 20000 }).should('be.visible').and('contain.text', 'Tire Stocking').click(getForceAction());
            cy.url().should('include', 'reportType=TireStocking');
        }
    });

    it('Should display Royalties Form', () => {
        cy.get('a[href="/Royalties"] > span', { timeout: 20000 }).should('be.visible').and('contain.text', 'Royalties Form').click(getForceAction());
        cy.get('#royalties-index', { timeout: 20000 }).should('exist').and('be.visible');
    });

    it('Should display Royalties History', () => {
        cy.get('a[href="/Royalties/List"] > span', { timeout: 20000 }).should('be.visible').and('contain.text', 'Royalties History').click(getForceAction());
        cy.get('#royalty-content', { timeout: 20000 }).should('exist').and('be.visible');
    });

    it('Should display Invoices', () => {
        cy.get('a[href="/Invoice/List"] > span', { timeout: 90000 }).should('be.visible').and('contain.text', 'Invoices').click(getForceAction());
        cy.get('#invoices-search-form', { timeout: 90000 }).should('exist').and('be.visible');
    });

    if (Cypress.expose('targetEnv') !== 'qa') {
        it('Should display Credit Report', () => {
            cy.get('a[href="/Report/CreditReport"] > span', { timeout: 20000 }).should('be.visible').and('contain.text', 'Credit Report').click(getForceAction());
            cy.get('#credit-reports', { timeout: 20000 }).should('exist').and('be.visible');
        });
    }


});