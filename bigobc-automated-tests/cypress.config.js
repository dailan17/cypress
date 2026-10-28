const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress/config", `${file}.json`);
  return fs.readJsonSync(pathToConfigFile);
}

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,

  e2e: {
    chromeWebSecurity: false,
    edgeWebSecurity: false,
    electronWebSecurity: false,

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportDir: 'cypress/reports/custom-report',
      reportFilename: 'smoke-test-results',
      timeStamp: 'mmddyyyy_HHMMss',
      reportPageTitle: 'custom-title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const targetEnv = config.env.targetEnv || "qa";
      const environments = getConfigurationByFile(targetEnv);
      config.expose = { ...config.env, ...environments };
      return config;
    },
  },
});
