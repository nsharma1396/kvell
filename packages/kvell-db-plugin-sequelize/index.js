/**
 * @type {import ("sequelize")}
 */
const Sequelize = require("sequelize");

const SequelizeInstance = require("./init");

/**
 * @type {() => Promise}
 */
const initHandler = require("./syncHandler");

/**
 * @type {import ("sequelize").Sequelize} Sequelize Instance for the plugin
 */
const dbInstance = SequelizeInstance.getDBInstance();

module.exports = {
  dbLib: Sequelize,
  dbInstance,
  initHandler: initHandler
};
