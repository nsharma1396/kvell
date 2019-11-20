const path = require("path");
const readFile = require("fs").readFile;
const promisify = require("util").promisify;

const readFileFromPath = promisify(readFile);

const parsedConfigInit = {
  appEntryPoint: "src/index.js"
};

const parseScriptsConfig = async appSrcDirectory => {
  const parsedConfig = parsedConfigInit;
  const configFilePath = path.relative(appSrcDirectory, "./nodescript.config.json");
  try {
    const configObject = await readFileFromPath(configFilePath, "UTF-8");
    const parsedConfigObject = JSON.parse(configObject);
    parsedConfig = {
      appEntryPoint: parsedConfigObject.entryPoint
    };
    return parsedConfig;
  } catch {
    return parsedConfigInit;
  }
};

module.exports = parseScriptsConfig;
