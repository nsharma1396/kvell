"use strict";

const path = require("path");
const chalk = require("chalk");
const fs = require("./fsWrapper");
const { createModelFiles } = require("../../lib/utils/updateAppModels");
const generateConfigTemplate = require("../templates/generateConfigTemplate");
const parseScriptConfig = require("../utils/parseScriptsConfig");

const log = console.log;

const generateModelFiles = async modelName => {
  // const fileExt = ".js";
  if (modelName) {
    const appRootDir = process.cwd();
    const pathToModel = path.resolve(appRootDir, "models", `${modelName}`);
    const parsedConfigs = await parseScriptConfig(appRootDir);

    const pathExists = await fs.pathExists(pathToModel);

    const pathExistsInConfig = parsedConfigs.models.indexOf(modelName) !== -1;

    if (pathExists) {
      log();
      log(chalk.redBright(`Error: '${modelName}' already exists in your models directory.`));
      log();
      log("Please check if the specified model name was correct.");
      log();
    } else if (pathExistsInConfig) {
      log();
      log(
        chalk.redBright(
          `Error: The entered model already exists in your ${chalk.yellow("kvell.config.js.")}`
        )
      );
      log();
      log("Please check if the specified model name was correct.");
      log();
    } else {
      // create the files

      const updatedConfigModels = parsedConfigs.models.slice();

      updatedConfigModels.push(modelName);
      const updatedConfig = Object.assign({}, parsedConfigs, { models: updatedConfigModels });

      // const updatedConfig = {
      //   ...parsedConfigs,
      //   models: updatedConfigModels
      // };

      await createModelFiles([modelName], updatedConfigModels);

      const configTemplate = generateConfigTemplate(updatedConfig);
      await fs.writeToFile(path.resolve(appRootDir, "kvell.config.js"), configTemplate);
      log("Updated 'kvell.config.js'");
      log();
    }
  } else {
    log();
    log(chalk.redBright("Model name cannot be empty!"));
    log();
  }
};

module.exports = generateModelFiles;
