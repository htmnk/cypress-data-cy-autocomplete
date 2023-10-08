const fsPromises = require("fs").promises;
const join = require("path").join;
const findSelectorsFilesAsync = require("./find").findSelectorsFilesAsync;
const defaultOptions = require("./options");
const generateDts = require("./generate").generateDts

async function dataCyAutocomplete(on, config, options) {
   const {
    srcPattern = defaultOptions.srcPattern,
    testsPattern = defaultOptions.testsPattern,
    srcSelectorRegex = defaultOptions.srcSelectorRegex,
    testsSelectorRegex = defaultOptions.testsSelectorRegex,
    checkUnusedSelectors = defaultOptions.checkUnusedSelectors,
    selectorsDtsFileName = defaultOptions.selectorsDtsFileName,
  } = options ? options : defaultOptions;

  try {
    // TODO: Improve if testsPattern also includes src,
    // because component tests might usually also be located
    // inside the src folder, in this case we don't need to
    // traverse extra time for tests.
    const [srcSelectors, testSelectors] = await Promise.all([
      findSelectorsFilesAsync(srcPattern, srcSelectorRegex),
      findSelectorsFilesAsync(testsPattern, testsSelectorRegex),
    ]);

    if (checkUnusedSelectors) {
      const unusedSelectors = srcSelectors.filter(
        (selector) => !testSelectors.includes(selector)
      );

      if (unusedSelectors.length > 0) {
        console.error(
          "WARNING! There are some selectors in your app that are not being used:\n"
        );
        console.log(unusedSelectors.join("\n"));
      }
    }

    const dtsOutputPath = join(
      config.supportFolder,
      `${selectorsDtsFileName}.d.ts`
    );
    const dtsContent = generateDts(srcSelectors)

    await fsPromises.writeFile(dtsOutputPath, dtsContent, "utf-8");
    console.log("Selectors written to", dtsOutputPath);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

module.exports = dataCyAutocomplete;
