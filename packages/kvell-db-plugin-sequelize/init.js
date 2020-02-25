const Sequelize = require("sequelize");

class SequelizeInstance {
  constructor() {
    this.instance = null;
  }
  createDBInstance(params) {
    return new Promise(function(resolve, reject) {
      try {
        const sequelizeOptions = Object.assign({}, params.options, {
          dialectModulePath: params.options.dialectModulePath || params.dialectModulePath
        });
        if (params.options.dialectModulePath) {
          this.instance = new Sequelize(
            params.database,
            params.username,
            params.password,
            sequelizeOptions
          );
          resolve();
        } else {
          throw new ReferenceError(
            "'dialectModulePath' is required by the sequelize plugin. Please provide the path. Refer to the documentation here https://kvelljs.now.sh/docs/database-plugins/kvell-db-plugin-sequelize#usage"
          );
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  getDBInstance() {
    return this.instance;
  }
}

const Instance = new SequelizeInstance();

module.exports = Instance;
