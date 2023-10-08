const defineConfig = require("cypress").defineConfig;
const findSelectorsFilesAsync= require("./src/find").findSelectorsFilesAsync;
const defaultOptions = require("./src/options");
// const dataCyAutocomplete = require("./src")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
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
    },
  },
});
