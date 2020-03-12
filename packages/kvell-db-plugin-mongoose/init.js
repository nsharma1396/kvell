const mongoose = require("mongoose");

class MongooseInstance {
  constructor() {
    this.instance = null;
  }
  createDBInstance(params) {
    return new Promise((resolve, reject) => {
      // Merge the two objects
      const mongooseOptions = Object.assign(
        {},
        { useNewUrlParser: true, useUnifiedTopology: true },
        params.options || {}
      );
      mongoose
        .connect(params.mongoConnectionString, mongooseOptions)
        .then(mongooseInstance => {
          this.instance = mongooseInstance;
          if (params.showConnectionMessage) {
            console.log("Connected to mongodb");
          }
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getDBInstance() {
    return this.instance;
  }
}

const Instance = new MongooseInstance();

module.exports = Instance;
