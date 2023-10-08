function generateSelectorDts(selectors) {
  return `export type Selector = \n  | "${selectors.join('"\n  | "')}"`;
}

function generateCyCommandDts() {
  return "declare global { namespace Cypress { interface Chainable { getDataCy: (selector: Selector, key?: string) => Cypress.Chainable<JQuery<HTMLElement>> } } }";
}

function generateDts(selectors) {
  return `${generateSelectorDts(selectors)}\n\n${generateCyCommandDts()}`;
}

module.exports = { generateDts };
