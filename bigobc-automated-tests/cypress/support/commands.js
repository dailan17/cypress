// ***********************************************
// Custom Commands para Cypress
// ***********************************************

Cypress.Commands.add('smartClick', { prevSubject: true }, (subject) => {
    const options = Cypress.expose('targetEnv') === 'qa'
        ? { force: true }
        : {};
    cy.wrap(subject).click(options);
});


Cypress.Commands.add('login', (roleOrUsername = 'admin') => {
    const users = Cypress.expose('users');
    const foundUser = users.find(u => u.type === roleOrUsername);
    const session = { username: foundUser.username, password: foundUser.password }

    cy.session(['login', session.username], () => {
        cy.visit(Cypress.expose('baseUrl'));
        cy.get("#username").type(session.username);
        cy.get("#password").type(session.password + '{enter}');
        cy.url({ timeout: 30000 }).should('include', '/Catalog');
    });
});

Cypress.Commands.add('acceptAllCookies', () => {
    cy.get('#onetrust-accept-btn-handler', { timeout: 20000 }).should('be.visible').click();
    if (Cypress.expose('environments') == 'qa')
        cy.get('.modaal-cancel', { timeout: 20000 }).should('be.visible').click();
});

Cypress.Commands.add('preventOneTrustOverlay', () => {

    cy.window().then((win) => {
        // CSS permanente
        const style = win.document.createElement('style');

        style.innerHTML = `.onetrust-pc-dark-filter,
        #onetrust-banner-sdk,
        #onetrust-consent-sdk {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        };`

        win.document.head.appendChild(style);
        // Eliminar elementos recreados
        const observer = new win.MutationObserver(() => {
            win.document
                .querySelectorAll(
                    '.onetrust-pc-dark-filter, #onetrust-banner-sdk, #onetrust-consent-sdk, .modaal-inner-wrapper, .modaal-outer-wrapper, .modaal-wrapper, .modaal-confirm, .modaal-pricing, .modaal-overlay'
                )
                .forEach(el => el.remove());
        });
        observer.observe(win.document.documentElement, {
            childList: true,
            subtree: true
        });
    });
});