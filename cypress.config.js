const defineConfig = require("cypress").defineConfig;
const findSelectorsFilesAsync= require("./src/find").findSelectorsFilesAsync;
const defaultOptions = require("./src/options");
// const dataCyAutocomplete = require("./src")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // dataCyAutocomplete(on, config)
      on("task", {
        findSrcSelectorsAsync({ filesPattern }) {
          return findSelectorsFilesAsync(
            filesPattern,
            defaultOptions.srcSelectorRegex
          );
        },

        findTestsSelectorsAsync({ filesPattern }) {
          return findSelectorsFilesAsync(
            filesPattern,
            defaultOptions.testsSelectorRegex
          );
        },
      });

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
