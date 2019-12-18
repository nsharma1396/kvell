const Sequelize = require("sequelize");
const dbInstance = require("./init");
const initHandler = require("./syncHandler");

module.exports = {
  dbLib: Sequelize,
  dbInstance: dbInstance,
  initHandler: initHandler
};
