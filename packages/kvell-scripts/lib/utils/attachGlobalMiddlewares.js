const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const noCache = require("nocache");

const attachCustomGlobalMiddlewares = require(path.resolve(
  process.cwd(),
  "global",
  "globalMiddlewares"
));

/**
 * @param {import ("express").Express} app
 * @param {import ("http").Server | import ("https").Server} server
 */
const attachGlobalMiddlewares = (app, server) => {
  app.disable("x-powered-by");
  app.use(
    helmet.frameguard(),
    helmet.hsts(),
    helmet.noSniff(),
    helmet.dnsPrefetchControl(),
    helmet.ieNoOpen(),
    helmet.referrerPolicy(),
    helmet.xssFilter()
    /* commenting helmet.noCache as it is deprecated, using `nocache` package instead */
    // helmet.noCache()
  );
  app.use(noCache());
  app.use(cors());
  app.use(logger("common"));
  attachCustomGlobalMiddlewares(app, server);
};

module.exports = attachGlobalMiddlewares;
