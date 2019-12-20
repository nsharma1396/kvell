/**
 * @typedef {import ("express").Express} KvellAppObject
 */

/**
 * @typedef {import ("express").Request} KvellRequestObject
 */

/**
 * @typedef {import ("express").Response} KvellResponseObject
 */

const express = require("express"); //();
const path = require("path");
const devLog = require("simple-node-logger").createSimpleFileLogger(
  path.resolve(process.cwd(), "logs", "appLog.log")
);

// Export if anything is needed to be exported.
module.exports = {
  json: express.json,
  static: express.static,
  urlencoded: express.urlencoded,
  router: express.Router,
  devLog
};
