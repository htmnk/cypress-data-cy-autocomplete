const express = require("express");
const findSelectorsFilesAsync = require("../src/find").findSelectorsFilesAsync;
const defaultOptions = require("../src/options");
const app = express();
const port = 3003;
const { srcSelectorRegex, testsSelectorRegex } = defaultOptions;

app.use(express.json());

// if there is code coverage information
// then expose an endpoint that returns it
/* istanbul ignore next */
if (global.__coverage__) {
  console.log("have code coverage, will add middleware for express");
  console.log(`to fetch: GET :${port}/__coverage__`);
  require("@cypress/code-coverage/middleware/express")(app);
}

app.post("/find-default-src", async (req, res) => {
  const selectors = await findSelectorsFilesAsync(
    req.body.srcPattern,
    srcSelectorRegex
  );
  res.json(selectors);
});

app.post("/find-default-tests", async (req, res) => {
  const selectors = await findSelectorsFilesAsync(
    req.body.testsPattern,
    testsSelectorRegex
  );
  res.json(selectors);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
