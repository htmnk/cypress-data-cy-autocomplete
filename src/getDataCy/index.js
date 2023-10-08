Cypress.Commands.add(
  "getDataCy",
  { prevSubject: "optional" },
  (prevSubject, selector, key) => {
    Cypress.log({
      name: "Get by [data-cy] attribute",
      displayName: "getDataCy",
      consoleProps() {
        return { selector, key };
      },
    });

    return (prevSubject ? cy.wrap(prevSubject) : cy).get(
      `[data-cy='${selector}']${key ? `[data-cy-key='${key}']` : ""}`,
      { log: false }
    );
  }
);
