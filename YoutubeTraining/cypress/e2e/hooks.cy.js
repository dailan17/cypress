//hooks -> Mocha

/*
1.- before()  se ejecuta una sola vez, al inicio
2.- beforeEach() se ejecuta antes de cada test
3.- testExecution()
4.- afterEach() se ejecuta después de cada test

5.- after() se ejecuta una vez, al final
*/

//skip - only

describe('Demo de hooks', () => {

    before(function(){
        cy.log('Before all');
    });

    beforeEach(function(){
        console.log('Before each');
    });


    it.skip('Should be test #1', function(){
        console.log('Test #1');
    });

    it.only('Should be test #2', function(){
        console.log('Test #2');
    });

    it('Should be test #3', function(){
        console.log('Test #3');
    });

    afterEach(function(){
        console.log('After each');
    });

    after(function(){
        cy.log('After all');
    });

});