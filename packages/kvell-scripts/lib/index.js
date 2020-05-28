"use strict";

/**
 * @typedef {import ("express").Express} KvellAppObject
 */

/**
 * @typedef {import ("http").Server | import ("https").Server} KvellServerObject
 */

/**
 * @typedef {import ("express").Request} KvellRequestObject
 */

/**
 * @typedef {import ("express").Response} KvellResponseObject
 */

const express = require("express");

const app = require("./server").app;

/**
 * @typedef {Object} Logger
 * @property {Function} trace A trace level log
 * @property {Function} debug A debug level log
 * @property {Function} info An info level log
 * @property {Function} warn A warn level log
 * @property {Function} error An error level log
 * @property {Function} fatal A fatal level log
 */
/**
 * @type {Logger}
 */
const devLog = require("./utils/getDevLogger")();

module.exports = {
  json: express.json,
  static: express.static,
  urlencoded: express.urlencoded,
  router: express.Router,
  devLog,
  app,
};
