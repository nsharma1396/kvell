"use strict";

const path = require("path");
const chalk = require("chalk");
const fs = require("./fsWrapper");
const createControllerFiles = require("../../lib/utils/createControllerFiles");
const { createRouteFiles } = require("../../lib/utils/updateAppRoutesAndModels");
const generateConfigTemplate = require("../templates/generateConfigTemplate");
const parseScriptConfig = require("../utils/parseScriptsConfig");

const log = console.log;

const generateRouteFiles = async (routeName, routeRootUrl) => {
  const fileExt = ".js";
  if (routeName && routeRootUrl) {
    const appRootDir = process.cwd();
    const pathToRoute = path.resolve(appRootDir, "routes", `${routeName}${fileExt}`);
    const pathToController = path.resolve(appRootDir, "controllers", `${routeName}${fileExt}`);
    const pathToDocs = path.resolve(appRootDir, "apidocs", `${routeName}${fileExt}`);
    const parsedConfigs = await parseScriptConfig(appRootDir);

    const pathExists = (
      await Promise.all([
        fs.pathExists(pathToRoute),
        fs.pathExists(pathToController),
        fs.pathExists(pathToDocs)
      ])
    ).reduce((result, exists) => exists || result, false);

    const pathExistsInConfig = parsedConfigs.routes.reduce((exists, route) => {
      if (!exists && (route.name === routeName || route.path === routeRootUrl)) {
        exists = true;
      }
      return exists;
    }, false);

    if (pathExists) {
      log();
      log(
        chalk.redBright(
          `Error: '${routeName}' already exists in your routes/controllers/apidocs directory.`
        )
      );
      log();
      log("Please check if the specified route URL and route name was correct.");
      log();
    } else if (pathExistsInConfig) {
      log();
      log(
        chalk.redBright(
          `Error: The entered route already exists in your ${chalk.yellow("kvell.config.js.")}`
        )
      );
      log();
      log("Please check if the specified route URL and route name was correct.");
      log();
    } else {
      // create the files

      const updatedConfigRoutes = parsedConfigs.routes.slice();

      updatedConfigRoutes.push({ name: routeName, path: routeRootUrl });

      const updatedConfig = Object.assign({}, parsedConfigs, { routes: updatedConfigRoutes });

      await createRouteFiles([{ name: routeName, path: routeRootUrl }], updatedConfigRoutes);

      await createControllerFiles([{ name: routeName, path: routeRootUrl }], updatedConfigRoutes);

      const configTemplate = generateConfigTemplate(updatedConfig);
      await fs.writeToFile(path.resolve(appRootDir, "kvell.config.js"), configTemplate);
      log("Updated 'kvell.config.js'");
      log();
    }
  } else {
    log();
    log(chalk.redBright("Route name and root URL cannot be empty!"));
    const emptyParams = [];
    if (!routeName) {
      emptyParams.push("Route Name");
    }
    if (!routeRootUrl) {
      emptyParams.push("Route Root URL");
    }
    log();
    log(`You entered empty string as value for:`);
    emptyParams.forEach((param, index) => log(chalk.yellow(`${index + 1}. ${param}`)));
    log();
  }
};

module.exports = generateRouteFiles;
