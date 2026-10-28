describe('Assertions Demo', () =>{
    beforeEach(() => {
        cy.visit('https://demoqa.com/radio-button');
    });

    //Assertions TDD se recomiendan cuando se requiere interacción con el DOM (interfaz de usuario - UI) ya que sus metodos asincronos
    // funcionan correctamente con Cypress y permiten realizar reintentos
    it('TDD Assertions', () => {
        cy.log('Lenght check');
        cy.get('input[type="radio"').should('have.length', 3);
        

        cy.log('Class check');
        cy.get('input[type="radio"]').eq(2).should('have.class', 'disabled');

        cy.log('Exist check');
        cy.get('.mt3').should('not.exist');

        cy.log('Text check');
        cy.get('input[type="radio"]').eq(0).click({force: true});
        cy.get('.text-success').should('have.text', 'Yes').and('have.css', 'color', 'rgb(25, 135, 84)');
    });

    //Assertions BDD se recomiendan cuando se va a evaluar un objeto Javascript y cuando se evalua la respuesta de un API
    //Se recomienda en solo aquellos casos donde no se va a interactuar con la intefaz de usuario
    it('BDD Assertions', () => {
        cy.log('Class & Lenght');
        cy.get('input[type="radio"]').should($inputs => {
            expect($inputs).to.have.lengthOf(3);
            expect($inputs[2]).to.have.class('disabled');
        });

        cy.log('Text check');
        cy.get('input[type="radio"]').eq(1).click({force: true});
        cy.get('.text-success').should($element => {
            expect($element).to.have.text('Impressive');
            expect($element).to.have.css('color', 'rgb(25, 135, 84)');
        });
    
    
    });
});