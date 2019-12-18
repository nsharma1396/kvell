const dbPlugin = require("../scripts/utils/getDBPlugin");

module.exports = {
  dbLib: dbPlugin.dbLib,
  dbInstance: dbPlugin.dbInstance
};
