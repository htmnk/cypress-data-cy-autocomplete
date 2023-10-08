const glob = require("glob").glob;
const fsPromises = require("fs").promises;

function findSelectors(inputStr, selectorRegex) {
  const selectors = [];
  const matches = inputStr.match(selectorRegex);

  if (!matches || matches.length === 0) {
    return [];
  }

  for (const match of matches) {
    const [_, selector] = match.match(/['"]([^'"]*)['"]/);

    if (selector) {
      selectors.push(selector);
    }
  }

  return selectors;
}

async function findSelectorsFilesAsync(filesPattern, selectorRegex) {
  const selectors = new Set();

  try {
    const files = await glob(filesPattern);

    if (!files || files.length === 0) {
      return [];
    }

    const readPromises = files.map(async (filePath) => {
      try {
        const fileContent = await fsPromises.readFile(filePath, "utf-8");
        const foundSelectors = findSelectors(fileContent, selectorRegex);

        foundSelectors.forEach((selector) => selectors.add(selector));
      } catch (error) {
        console.error(`Error reading file "${filePath}":`, error.message);
      }
    });

    await Promise.all(readPromises);
  } catch (error) {
    console.error("Error during file globbing:", error.message);
  }

  return Array.from(selectors).sort();
}

module.exports = { findSelectorsFilesAsync, findSelectors };
