const path = require("path");
const chalk = require("chalk");
const express = require("express");
const inquirer = require("inquirer");
const writeToFile = require("../../scripts/utils/fsWrapper").writeToFile;
const generateRouteTemplate = require("../../scripts/templates/generateRouteTemplate");
const generateRouteIndexTemplate = require("../../scripts/templates/generateRouteIndexTemplate");
const createControllerFiles = require("./createControllerFiles");
const { validateModelFiles, createModelFiles } = require("./updateAppModels");
const capitalizeFirstLetter = require("../../scripts/utils/capitalizeFirstLetter");

const log = console.log;

const requireRouteFiles = () => {
  const routesFileObject = require(path.resolve(process.cwd(), "routes"));
  return routesFileObject;
};

const createRouteFiles = async (unresolvedFiles, allRoutes) => {
  const appDirectoryPath = process.cwd();
  const routeDirPath = path.resolve(appDirectoryPath, "routes");
  const apiDocDirPath = path.resolve(appDirectoryPath, "apidocs");
  for await (const unresolvedFile of unresolvedFiles) {
    // Create a route file
    log();
    const fileName = unresolvedFile.name;
    const fileExt = ".js";
    const filePath = path.resolve(routeDirPath, `${fileName}${fileExt}`);
    const apiDocFilePath = path.resolve(apiDocDirPath, `${fileName}${fileExt}`);
    log(chalk.blue(`Creating ${fileName}${fileExt} in ${filePath}...`));
    const routeTemplateData = generateRouteTemplate(fileName);
    await writeToFile(filePath, routeTemplateData);
    // For each route, create a corresponding api doc file in apiDocs directory
    await writeToFile(apiDocFilePath, "");
    log(chalk.green(`Created ${fileName}${fileExt}...`));
  }
  log();
  const routeIndexPath = path.resolve(routeDirPath, "index.js");
  const routeIndexData = generateRouteIndexTemplate(allRoutes);
  await writeToFile(routeIndexPath, routeIndexData);
  log(`Updated ${routeIndexPath}...`);
  log();
  return true;
};

const attachApiDocRoute = app => {
  const libPath = path.dirname(path.dirname(__dirname));
  const docSrc = path.resolve(libPath, "apidocs");
  app.use(express.static(docSrc));
  app.use("(^/docs$)", (_req, res) => {
    res.sendFile(path.resolve(docSrc, "index.html"));
  });
  app.use("/", (req, res) => {
    res.send("hey");
  });
};

const attachRoutes = (app, routes, routeFiles, autoRequireRoutes = true) => {
  if (autoRequireRoutes) {
    routes.forEach(route => {
      app.use(route.path, routeFiles[route.name]);
    });
  }
  attachApiDocRoute(app);
  return true;
};

const validateRouteFiles = routes => {
  const routeFiles = requireRouteFiles();
  let allRoutesResolved = true,
    unresolvedRouteFiles = [];
  routes.forEach(route => {
    if (!routeFiles[route.name]) {
      allRoutesResolved = false;
      unresolvedRouteFiles.push(route);
    }
  });
  return {
    allRoutesResolved,
    unresolvedRouteFiles,
    routeFiles
  };
};

const updateAppRoutesAndModels = (app, routes, models, autoRequireRoutes) => {
  const { allRoutesResolved, unresolvedRouteFiles, routeFiles } = validateRouteFiles(routes);
  const { allModelsResolved, unresolvedModelFiles } = validateModelFiles(models);
  if (allRoutesResolved && allModelsResolved) {
    return attachRoutes(app, routes, routeFiles, autoRequireRoutes);
  } else {
    log();
    log(
      chalk.redBright(
        "Seems like there are no corresponding files for the following in your application:"
      )
    );
    if (!allRoutesResolved) {
      log();
      log(chalk.redBright("Routes:"));
      unresolvedRouteFiles.forEach((unresolvedRoute, index) => {
        log(chalk.redBright(`${index + 1}. ${unresolvedRoute.name} (${unresolvedRoute.path})`));
      });
    }
    if (!allModelsResolved) {
      log();
      log(chalk.redBright("Models:"));
      unresolvedModelFiles.forEach((unresolvedModel, index) => {
        log(
          chalk.redBright(
            `${index + 1}. ${unresolvedModel} (${capitalizeFirstLetter(unresolvedModel)})`
          )
        );
      });
    }
    log();
    return inquirer
      .prompt([
        {
          name: "fixUnresolvedRoutesAndModels",
          type: "confirm",
          message: chalk.blueBright("Would you like us to create the files for you ?")
        }
      ])
      .then(async answers => {
        if (answers.fixUnresolvedRoutesAndModels) {
          if (unresolvedRouteFiles.length) {
            await createRouteFiles(unresolvedRouteFiles, routes);
            await createControllerFiles(unresolvedRouteFiles, routes);
          }
          if (unresolvedModelFiles.length) {
            await createModelFiles(unresolvedModelFiles, models);
          }
          return updateAppRoutesAndModels(app, routes, routeFiles);
        } else {
          log();
          throw new Error(
            `Please add the above mentioned files to run the application, or restart the server and answer ${chalk.redBright(
              `yes`
            )} to automatically create all the files with their templates.`
          );
          // return false;
        }
      });
  }
};

module.exports = {
  requireRouteFiles,
  updateAppRoutesAndModels,
  createRouteFiles,
  validateRouteFiles
};
