const appRouter = require("express").Router; //();
const path = require("path");
const devLog = require("simple-node-logger").createSimpleFileLogger(
  path.resolve(process.cwd(), "logs", "appLog.log")
);

// Export if anything is needed to be exported.
module.exports = {
  router: appRouter,
  devLog
};
