const path = require("path");
const readFile = require("fs").readFile;
const promisify = require("util").promisify;
const parsedConfigInit = require("../config/appDefaultConfig");

const readFileFromPath = promisify(readFile);
const configFileName = "nodescript.config.json";

const configErrorKeys = ["routes", "protocol", "database"];

const createConfigObject = parsedConfigs => {
  const configKeysStatus = {
    routes: {
      valid: !parsedConfigs.routes ? true : Array.isArray(parsedConfigs.routes)
    },
    protocol: {
      valid: !parsedConfigs.protocol
        ? true
        : ["http", "https"].indexOf(parsedConfigs.protocol) !== -1
    },
    database: {
      valid: parsedConfigs.database && parsedConfigs.database.pluginName
    }
  };

  const { routes, protocol, database } = configKeysStatus;

  let configObject = {};
  if (!routes.valid || !protocol.valid || !database) {
    const errorString = `Your ./${configFileName} contains invalid config values for:\n${configErrorKeys
      .filter(configKey => !configKeysStatus[configKey].valid)
      .join("\n")}`;
    throw new Error(errorString);
  } else {
    configObject = {
      routes: parsedConfigs.routes || parsedConfigInit.routes,
      protocol: parsedConfigs.protocol || parsedConfigInit.protocol,
      database: parsedConfigs.database
    };
  }
  return configObject;
};

const parseScriptsConfig = async appSrcDirectory => {
  let parsedConfig = parsedConfigInit;
  const configFilePath = path.relative(appSrcDirectory, `./${configFileName}`);
  // try {
  const configObject = await readFileFromPath(configFilePath, "UTF-8");
  const parsedConfigObject = JSON.parse(configObject);
  parsedConfig = createConfigObject(parsedConfigObject);
  return parsedConfig;
  // } catch (e) {
  //   console.log(e);

  //   return parsedConfigInit;
  // }
};

module.exports = parseScriptsConfig;
