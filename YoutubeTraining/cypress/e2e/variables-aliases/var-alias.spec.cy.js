describe('Variables and Aliases', () => {
    
    beforeEach(function(){
        cy.visit('https://demoqa.com/modal-dialogs');
    });

    // it('Variables function at return value', () => {
    //     const smallModalText = cy.get('showSmallModal').text();
    //     cy.log('smallModalText');
    // })

    it('Closures & variables', () => {
        cy.get('#showSmallModal').then($modalButton =>{
            const smallModalText = $modalButton.text();
            cy.log(smallModalText);

            $modalButton.click();

            cy.get('#example-modal-sizes-title-sm').contains(smallModalText, {matchCase: false});

        })
    });

    // it('Sharing context missconception', () => {
    //     cy.log(smallModalText);
    // });

    //los alias no funcionan con arrw/callback functions, tienen que ser declaraciones de funciones tradicionales
    it|('Aliases', function() {
        cy.get('#showSmallModal').invoke('text').as('invokeText');

        cy.get('#showSmallModal').then(($modalButton) => {
            const smallModalText = $modalButton.text();
            cy.log(smallModalText);
            cy.wrap(smallModalText).as('wrapText');
        });
    });

    it|('Share context', () => {
        cy.log('INVOKE: ' + this.invokeText);
        cy.log('WRAP: ' + this.wrapText);
    });
});