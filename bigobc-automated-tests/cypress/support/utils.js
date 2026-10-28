export const getForceAction = () => {
    return Cypress.expose('targetEnv') === 'qa' ? { force: true } : {};
};
