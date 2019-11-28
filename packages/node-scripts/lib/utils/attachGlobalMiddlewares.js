const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const attachCustomGlobalMiddlewares = require(path.resolve(
  process.cwd(),
  "global",
  "globalMiddlewares"
));

const attachGlobalMiddlewares = app => {
  app.use(cors());
  app.use(logger("dev"));
  attachCustomGlobalMiddlewares(app);
};

module.exports = attachGlobalMiddlewares;
