const express = require("express");
const chalk = require("chalk");
const getServerUrls = require("./utils/getServerUrls");
const attachGlobalMiddlewares = require("./utils/attachGlobalMiddlewares");
const { requireRouteFiles, updateAppRoutes } = require("./utils/updateAppRoutes");

const log = console.log;

const PORT = process.env.PORT || 5001;

const runServer = async (scriptConfig, onSuccess) => {
  require("dotenv").config();
  const { initHandler } = require("../scripts/utils/getDBPlugin");
  const routeFiles = requireRouteFiles();

  const app = express();

  const { routes, protocol } = scriptConfig;
  const isHTTP = protocol === "http";

  // add middlewares before starting the server
  attachGlobalMiddlewares(app);

  const shouldStartServer = await updateAppRoutes(app, routes, routeFiles);

  if (shouldStartServer) {
    initHandler()
      .then(() => {
        log();
        log(chalk.blue("Starting the server..."));
        log();

        app.listen(PORT, () => {
          const ipDetails = getServerUrls();
          log(
            chalk.blue(`Server running on:`),
            chalk.yellowBright(`${isHTTP ? "http://" : "https://"}${ipDetails.localIp}:${PORT}`)
          );
          log(
            chalk.blue(`You can also use: `),
            chalk.yellowBright(`${isHTTP ? "http://" : "https://"}localhost:${PORT}`)
          );
          onSuccess();
        });
      })
      .catch(e => {
        log();
        log(chalk.redBright(e.stack));
        log();
      });
  } else {
    // process.exit(1);
  }
};

module.exports = runServer;
