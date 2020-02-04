const mongoose = require("mongoose");

class MongooseInstance {
  constructor() {
    this.instance = null;
  }
  createDBInstance = params => {
    mongoose
      .connect(params.mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ...params.options
      })
      .then(_ => {
        if (params.showConnectionMessage) {
          console.log("Connected to mongodb");
        }
      })
      .catch(_ => {
        console.log(e);
      });
  };

  getDBInstance = () => {
    return this.instance;
  };
}

const Instance = new MongooseInstance();

module.exports = Instance;
