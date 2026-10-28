const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true, //siempre se debe configurar a true para declarar variables de ambiente
  experimentalModifyObstructiveThirdPartyCode: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const targetEnv = config.env.targetEnv || 'dev';
      const environments= {
        dev:{
          env : 'dev',
          siteUrl: 'https://dev.tbconline.app',
          ssoUrl: 'https://dev-sso.cloudcentral.app',
          username: 'jparra2',
          password: 'Tormenta_4'
        },
        qa:{
          env : 'qa',
          siteUrl: 'https://qa.tbconline.app',
          ssoUrl: 'https://dev-sso.cloudcentral.app',
          username: 'evalentin',
          password: 'Welcome2.'
        },
        prod:{
          env : 'prod',
          siteUrl: 'https://www.tbconline.app',
          ssoUrl: 'https://sso.cloudcentral.app',
          username: 'dguzman',
          password: ''
        }
      }
      config.expose = {...config.env, ...environments[targetEnv]};
      return config;
    },
  },
});
