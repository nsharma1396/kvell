/**
 * @type {import ("sequelize")}
 */
const Sequelize = require("sequelize");
/**
 * @type {import ("sequelize").Sequelize}
 */
const dbInstance = require("./init");

/**
 * @type {() => Promise}
 */
const initHandler = require("./syncHandler");

module.exports = {
  dbLib: Sequelize,
  dbInstance: dbInstance,
  initHandler: initHandler
};
