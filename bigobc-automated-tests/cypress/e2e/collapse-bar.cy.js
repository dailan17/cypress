describe('BOTBC - Collapse Bar', () => {
    beforeEach(() => {
        cy.login('admin');
        cy.visit(Cypress.expose('baseUrl'));
        cy.acceptAllCookies();
        cy.preventOneTrustOverlay();
    });
  it('Should expand and collapse all accordion sections correctly', () => {

    cy.get('#ContactAccordian > li', { timeout: 60000 }).each(($item) => {

      // Initial State
      cy.wrap($item)
        .should('have.class', 'collapsed');

      // Expanded
      cy.wrap($item)
        .find('.header')
        .click();

      cy.wrap($item)
        .should('have.class', 'expanded')
        .and('not.have.class', 'collapsed');

      // Get title of all sections
      cy.wrap($item)
        .find('.header')
        .invoke('text')
        .then((text) => {

          const sectionName = text.trim();

          if (sectionName.includes('NTW OPERATIONS')) {

            cy.wrap($item)
              .find('button.problembutton')
              .should('be.visible')
              .and('contain.text', 'Report Problem');

          } else {

            cy.wrap($item)
              .find('.content')
              .invoke('text')
              .should('match', /name/i);

            cy.wrap($item)
              .find('.content')
              .invoke('text')
              .should('match', /email/i);
          }

        });

      // Collapsed again
     /* cy.wrap($item)
        .find('.header')
        .click();

      cy.wrap($item)
        .should('have.class', 'collapsed')
        .and('not.have.class', 'expanded');*/
    });

  });

});