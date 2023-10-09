const defineConfig = require("cypress").defineConfig;
// const dataCyAutocomplete = require("./src")

module.exports = defineConfig({
  env: {
    codeCoverage: {
      url: "http://localhost:3003/__coverage__",
      expectBackendCoverageOnly: true,
      exclude: ['server/**/*.*']
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3003',
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // dataCyAutocomplete(on, config)

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
