/**
 * @type {import ("mongoose")}
 */
const mongoose = require("mongoose");
/**
 * @type {import ("mongoose")}
 */
const dbInstance = require("./init");

/**
 * @type {() => Promise}
 */
const initHandler = require("./syncHandler");

module.exports = {
  dbLib: mongoose,
  dbInstance,
  initHandler
};
