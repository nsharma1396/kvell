const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const attachCustomGlobalMiddlewares = require(path.resolve(
  process.cwd(),
  "global",
  "globalMiddlewares"
));

/**
 *
 * @param {import ("express").Express} app
 */
const attachGlobalMiddlewares = app => {
  app.disable("x-powered-by");
  app.use(
    helmet.frameguard(),
    helmet.hsts(),
    helmet.noSniff(),
    helmet.dnsPrefetchControl(),
    helmet.ieNoOpen(),
    helmet.referrerPolicy(),
    helmet.xssFilter(),
    helmet.noCache()
  );
  app.use(cors());
  app.use(logger("dev"));
  attachCustomGlobalMiddlewares(app);
};

module.exports = attachGlobalMiddlewares;
