const { config } = require("../lib/utils/parseEnvironmentVariables");
module.exports = config.current.parsed;
