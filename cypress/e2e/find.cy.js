const defaultOptions = require("../../src/options");

describe("find", () => {
  describe("default srcSelectorRegex and testsSelectorRegex", () => {
    it("should match data-cy with double quotes", () => {
      expect([
        '<div data-cy="example1"> <div data-cy="example2">'.match(
          defaultOptions.srcSelectorRegex
        ),
        'cy.getDataCy("example1"); cy.getDataCy("example2")'.match(
          defaultOptions.testsSelectorRegex
        ),
      ]).to.deep.equal([
        ['data-cy="example1"', 'data-cy="example2"'],
        ['.getDataCy("example1")', '.getDataCy("example2")'],
      ]);
    });

    it("should match data-cy with single quotes", () => {
      expect([
        "<MyComponent data-cy='example3' /> <AnotherOne data-cy='example4' />".match(
          defaultOptions.srcSelectorRegex
        ),

        "cy.getDataCy('example3').click(); cy.getDataCy('example4').focus() />".match(
          defaultOptions.testsSelectorRegex
        ),
      ]).to.deep.equal([
        ["data-cy='example3'", "data-cy='example4'"],
        [".getDataCy('example3')", ".getDataCy('example4')"],
      ]);
    });

    it("should match data-cy with mixed quotes", () => {
      expect([
        "<One data-cy=\"example5\" /> <Two data-cy='example6' /> <Three data-cy='example10' />".match(
          defaultOptions.srcSelectorRegex
        ),
        "cy.getDataCy(\"example5\"); cy.getDataCy('example6'); cy.getDataCy('example10');".match(
          defaultOptions.testsSelectorRegex
        ),
      ]).to.deep.equal([
        ['data-cy="example5"', "data-cy='example6'", "data-cy='example10'"],
        [
          '.getDataCy("example5")',
          ".getDataCy('example6')",
          ".getDataCy('example10')",
        ],
      ]);
    });

    it("should not match data-cy without quotes", () => {
      expect("<Fail data-cy=example7 />".match(defaultOptions.srcSelectorRegex))
        .to.be.null;
    });

    it("should not match selector inside {}", () => {
      expect("a data-cy={variable}".match(defaultOptions.srcSelectorRegex)).to
        .be.null;
    });
  });

  describe("findSelectorsFilesAsync using default srcSelectorRegex and testsSelectorRegex", () => {
    it("should return an empty array for non-existing paths", () => {
      cy.request('POST', '/find-default-src', { srcPattern: "does/not/exist" }).as('find')
      cy.get('@find').should((response) => {
        expect(response.body).to.deep.equal([])
      })
    });

    it("should return an empty array for files with no selectors inside or for files with unknown extensions", () => {
      cy.request('POST', '/find-default-src', { srcPattern: "cypress/examples/example1/" + defaultOptions.srcPattern }).as('findSrc')
      cy.get('@findSrc').should((response) => {
        expect(response.body).to.deep.equal([])
      })
      cy.request('POST', '/find-default-tests', { testsPattern: "cypress/examples/example1/" + defaultOptions.testsPattern }).as('findTests')
      cy.get('@findTests').should((response) => {
        expect(response.body).to.deep.equal([])
      })
    });

    it("should find selectors in a single file", () => {
      cy.request('POST', '/find-default-src', { srcPattern: "cypress/examples/example2/" + defaultOptions.srcPattern }).as('findSrc')
      cy.get('@findSrc').should((response) => {
        expect(response.body).to.deep.equal(["bar", "foo"])
      })

      cy.request('POST', '/find-default-tests', { testsPattern: "cypress/examples/example2/" + defaultOptions.testsPattern }).as('findTests')
      cy.get('@findTests').should((response) => {
        expect(response.body).to.deep.equal(["bar", "foo"])
      })
    });

    it("should find selectors in multiple files", () => {
      cy.request('POST', '/find-default-src', { srcPattern: "cypress/examples/example3/" + defaultOptions.srcPattern }).as('findSrc')
      cy.get('@findSrc').should((response) => {
        expect(response.body).to.deep.equal(["one", "two", "three", "four"].sort())
      })

      cy.request('POST', '/find-default-tests', { testsPattern: "cypress/examples/example3/" + defaultOptions.testsPattern }).as('findTests')
      cy.get('@findTests').should((response) => {
        expect(response.body).to.deep.equal(["one", "two", "three", "four"].sort())
      })
    })
  });
});
