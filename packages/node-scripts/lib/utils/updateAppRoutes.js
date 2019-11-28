const path = require("path");
const chalk = require("chalk");
const express = require("express");
const inquirer = require("inquirer");
const writeToFile = require("../../scripts/utils/fsWrapper").writeToFile;
const generateRouteTemplate = require("../../scripts/templates/generateRouteTemplate");
const generateRouteIndexTemplate = require("../../scripts/templates/generateRouteIndexTemplate");
const createControllerFiles = require("./createControllerFiles");

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
  app.use("/", (_req, res) => {
    res.sendFile("index.html");
  });
};

const attachRoutes = (app, routes, routeFiles) => {
  attachApiDocRoute(app);
  routes.forEach(route => {
    app.use(route.path, routeFiles[route.name]);
  });
  return true;
};

const updateAppRoutes = (app, routes, routeFiles) => {
  let allRoutesResolved = true,
    unresolvedRouteFiles = [];
  routes.forEach(route => {
    if (!routeFiles[route.name]) {
      allRoutesResolved = false;
      unresolvedRouteFiles.push(route);
    }
  });
  if (allRoutesResolved) {
    return attachRoutes(app, routes, routeFiles);
  } else {
    log();
    log(
      chalk.redBright(
        `Seems like there is no corresponding \`Route\` and \`Controller\` files for the following routes in your application:`
      )
    );
    log();
    unresolvedRouteFiles.forEach((unresolvedRoute, index) => {
      log(chalk.redBright(`${index + 1}. ${unresolvedRoute.name} (${unresolvedRoute.path})`));
    });
    log();
    return inquirer
      .prompt([
        {
          name: "fixUnresolvedRoutes",
          type: "confirm",
          message: chalk.blueBright("Would you like us to create the files for you ?")
        }
      ])
      .then(async answers => {
        if (answers.fixUnresolvedRoutes) {
          await createRouteFiles(unresolvedRouteFiles, routes);
          await createControllerFiles(unresolvedRouteFiles, routes);
          return updateAppRoutes(app, routes, routeFiles);
        } else {
          process.kill(process.pid, "SIGINT");
          return false;
        }
      });
  }
};

module.exports = { requireRouteFiles, updateAppRoutes, createRouteFiles };
