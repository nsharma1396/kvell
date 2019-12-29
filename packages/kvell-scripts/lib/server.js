const express = require("express");
const chalk = require("chalk");
const getServerUrls = require("./utils/getServerUrls");
const attachGlobalMiddlewares = require("./utils/attachGlobalMiddlewares");
const { parseEnvironmentVariables } = require("./utils/parseEnvironmentVariables");
const { updateAppRoutesAndModels } = require("./utils/updateAppRoutesAndModels");

const log = console.log;

/**
 * @function
 * @param {import ("../scripts/utils/parseScriptsConfig").ScriptsConfig} scriptConfig
 * @param {() => {}} onSuccess
 */
const runServer = async (scriptConfig, onSuccess) => {
  parseEnvironmentVariables();

  const PORT = process.env.PORT || 5001;

  const { initHandler } = require("../scripts/utils/getDBPlugin");

  // fileLogger.setLevel("warn");

  const app = express();

  const { routes, protocol, models, autoRequireRoutes } = scriptConfig;
  const isHTTP = protocol === "http";

  // add middlewares before starting the server
  attachGlobalMiddlewares(app);

  const shouldStartServer = await updateAppRoutesAndModels(app, routes, models, autoRequireRoutes);

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
          log(
            chalk.blue(`Api Docs available on:`),
            chalk.yellowBright(`${isHTTP ? "http://" : "https://"}localhost:${PORT}/docs`)
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
