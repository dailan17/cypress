class homeSaucePage{
    elements = {
        usernameInput: () => cy.get('#user-name'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#login-button'),
        errorMessager: () => cy.get('h3[data-test="error"]')
    }

    typeUsername(userName){
        this.elements.usernameInput().type(userName);
        }

    typePassword(password){
        this.elements.passwordInput().type(password);
    }

    clickLogin(){
        this.elements.loginButton().click();
    }
}

module.exports = new homeSaucePage();
