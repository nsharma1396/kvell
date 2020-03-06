const express = require("express");
const chalk = require("chalk");
const httpServer = require("http").createServer;
// const httpsServer = require("https").createServer;
const getServerUrls = require("./utils/getServerUrls");
// const attachGlobalMiddlewares = require("./utils/attachGlobalMiddlewares");
// const { parseEnvironmentVariables } = require("./utils/parseEnvironmentVariables");
const { updateAppRoutesAndModels, attachApiDocRoute } = require("./utils/updateAppRoutesAndModels");
const getDBPlugins = require("../scripts/utils/getDBPlugin");

const log = console.log;

/**
 * @function
 * @param {import ("../scripts/utils/parseScriptsConfig").ScriptsConfig} scriptConfig
 */
const runServer = async scriptConfig => {
  // parseEnvironmentVariables();

  const PORT = process.env.PORT || 5001;

  const syncHandlers = await getDBPlugins(scriptConfig.databasePlugins);

  const app = express();

  const { routes, protocol, models, autoRequireRoutes } = scriptConfig;
  const isHTTP = protocol === "http";

  // Create `server` variable for running 'http' or 'https' server based on user's configuration
  // const server = isHTTP ? httpServer(app) : httpsServer(app);
  const server = httpServer(app);

  // Attach api doc route before any other route or middleware
  attachApiDocRoute(app);

  // add middlewares before starting the server
  require("./utils/attachGlobalMiddlewares")(app, server);
  // attachGlobalMiddlewares(app);

  const shouldStartServer = await updateAppRoutesAndModels(app, routes, models, autoRequireRoutes);

  if (shouldStartServer) {
    try {
      await Promise.all(Object.keys(syncHandlers).map(handlerKey => syncHandlers[handlerKey]()));
      log();
      log(chalk.blue("Starting the server..."));
      log();

      server.listen(PORT, () => {
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
      });
    } catch (exception) {
      log();
      log(chalk.redBright(exception.stack));
      log();
    }
  }
};

module.exports = runServer;
