const path = require("path");
const chalk = require("chalk");
const parsedConfigInit = require("../config/pluginDefaultConfig");

const configFileName = "kvell-plugins.js";

const configErrorKeys = ["databasePlugins"];

const createConfigObject = parsedConfigs => {
  const configKeysStatus = {
    databasePlugins: {
      valid: !parsedConfigs.databasePlugins ? true : Array.isArray(parsedConfigs.databasePlugins)
    }
  };

  const { databasePlugins } = configKeysStatus;

  let configObject = {};
  if (!databasePlugins.valid) {
    const errorString = `Your ./${configFileName} contains invalid plugin config values for:\n${configErrorKeys
      .filter(configKey => !configKeysStatus[configKey].valid)
      .map((errorKey, index) => `${index + 1}. ${errorKey}`)
      .join("\n")}\n`;
    throw new Error(errorString);
  } else {
    configObject = {
      databasePlugins: parsedConfigs.databasePlugins || parsedConfigInit.databasePlugins
    };
  }
  return configObject;
};

/**
 *
 * @typedef {Object} PluginConfig
 * @property {{}[]} databasePlugins
 */

/**
 * @returns {Promise<PluginConfig>}
 */
const parsePluginConfig = async appSrcDirectory => {
  let parsedPluginConfig = parsedConfigInit;
  const configFilePath = path.join(appSrcDirectory, `./${configFileName}`);
  let parsedConfigObject;
  try {
    parsedConfigObject = require(configFilePath);
    parsedPluginConfig = createConfigObject(parsedConfigObject);
  } catch (exception) {
    if (exception.code !== "MODULE_NOT_FOUND") {
      throw exception;
    }
    console.log();
    console.log(
      `${chalk.bgYellow.black("WARN")} ${chalk.yellowBright(
        "No kvell-plugins.js found. Initializing plugins as empty."
      )}`
    );
  }
  return parsedPluginConfig;
};

module.exports = parsePluginConfig;
