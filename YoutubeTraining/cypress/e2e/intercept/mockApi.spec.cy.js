describe('Intercept demo', () => {

    it('Initial validation', () => {
        cy.visit('https://example.cypress.io/todo');
        cy.get('.todo-list li', { timeout: 20000 })
            .should('have.length', 2)
            .and('contain', 'Pay electric bill')
            .and('contain', 'Walk the dog');
    });

    it('Mocked API Response', () => {
        cy.intercept('GET', '/todos', {
            fixture: 'intercept/interceptFixture.json'

        }).as('getTodos-fixture');

        cy.visit('https://example.cypress.io/todo');

        cy.get('.todo-list li')
            .should('have.length', 2)
            .and('contain', 'Pay electric bill')
            .and('contain', 'Walk the dog');
    
    });

    it('Mocked a ready todo item', () => {
        const stubExample = [{
            "title": "Mock API Response",
            "completed": true,
            "id": 1
        }];

        cy.intercept('GET', '/todos', {
            body: [stubExample]
        });

        cy.visit('https://example.cypress.io');
        cy.get('div label').should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)');
    });


});