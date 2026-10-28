const { defineConfig } = require("cypress");


module.exports = defineConfig({
  projectId: 'ztw6u4',
  allowCypressEnv: false,
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: 'cypress/reports/custom-report',
    reportFilename: 'test-results',
    timeStamp: 'mmddyyyy_HHMMss',
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) 
    {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
