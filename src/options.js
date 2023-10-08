module.exports = {
  srcPattern: "src/**/*.{html,js,ts,jsx,tsx,vue,svelte}",
  testsPattern: "cypress/**/*.{js,ts}",
  srcSelectorRegex: /data-cy=["']([^"']+)["']/g,
  testsSelectorRegex: /\.getDataCy\(["']([^"']+)["']\)/g,
  checkUnusedSelectors: true,
  selectorsDtsFileName: "selectors",
};
