//Los fixtures son para cargar un fixed data cargado en un archivo

describe('Fixtures demo', () => {

    //La declaración de funciones clasicas se utilizan para compartir estados y variables entre hooks (before, BeforeEach, etc)
    //y en las pruebas it, y todas ellas deben de declararse de igual forma, ya que al intentar declaras como función flecha (callback) ocurrira el error "Cannot set properties"
    beforeEach(function () {
        cy.visit('https://www.saucedemo.com/');
        cy.fixture('fixtures-demo/sauceCredentials')
        .then(credentials => {
            this.credentials = credentials;
        });
    });


    it('Standard username', function () {
        cy.get('#user-name').type(this.credentials.standardUser);
        cy.get('#password').type(this.credentials.systemPassword);
        cy.get('#login-button').click();

        cy.get('.title').should('contain.text', 'Products');
    
    });

    it('Incorrect user', function () {
        cy.get('#user-name').type(this.credentials.dummyUsername);
        cy.get('#password').type(this.credentials.systemPassword);
        cy.get('#login-button').click();

        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Incorrect password', function () {
        cy.get('#user-name').type(this.credentials.standardUser);
        cy.get('#password').type(this.credentials.dummyPassword);
        cy.get('#login-button').click();

        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Locked out user', function () {
        cy.get('#user-name').type(this.credentials.lockedUsername);
        cy.get('#password').type(this.credentials.systemPassword);
        cy.get('#login-button').click();

        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
    });


    //otra alternativa de hacerlo y usando funciones flecha (callback) es aplicando el alias "as"
    // beforeEach(() => {
    //     cy.visit('https://www.saucedemo.com/');
    //     // Carga el fixture y guárdalo en un alias
    //     cy.fixture('fixtures-demo/sauceCredentials').as('credentials');
    // });

    // it('Standard username', () => {
    //     // Obten los datos del alias usando cy.get()
    //     cy.get('@credentials').then((credentials) => {
    //         cy.get('#user-name').type(credentials.standardUser);
    //         cy.get('#password').type(credentials.systemPassword);
    //         cy.get('#login-button').click();
    //         cy.get('.title').should('contain.text', 'Products');
    //     });
    // });

});