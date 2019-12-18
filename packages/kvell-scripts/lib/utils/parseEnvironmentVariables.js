let config = {};
const parseEnvironmentVariables = () => {
  config.current = require("dotenv").config();
};

module.exports = {
  parseEnvironmentVariables,
  config
};
