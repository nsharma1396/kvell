const Sequelize = require("sequelize");

class SequelizeInstance {
  constructor() {
    this.instance = null;
  }
  createDBInstance = params => {
    if (params.options.dialectModulePath || params.dialectModulePath) {
      this.instance = new Sequelize(params.database, params.username, params.password, {
        ...params.options,
        dialectModulePath: params.options.dialectModulePath || params.dialectModulePath
      });
    } else {
      throw new ReferenceError(
        "'dialectModulePath' is required by the sequelize plugin. Please provide the path. Refer to the documentation here https://kvelljs.now.sh/docs/database-plugins/kvell-db-plugin-sequelize#usage"
      );
    }
  };

  getDBInstance = () => {
    return this.instance;
  };
}

const Instance = new SequelizeInstance();

module.exports = Instance;
