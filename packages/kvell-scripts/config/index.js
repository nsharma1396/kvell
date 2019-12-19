const { config, parseEnvironmentVariables } = require("../lib/utils/parseEnvironmentVariables");

if (!config.current || !config.current.parsed) {
  parseEnvironmentVariables();
}

module.exports = config.current.parsed;
