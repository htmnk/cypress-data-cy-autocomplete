describe("example1", () => {
  it("has no getDataCy", () => {
    cy.getDataCy("foo").click();
    cy.getDataCy("bar").focus();
  });
});
