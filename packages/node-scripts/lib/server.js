const express = require("express");
const chalk = require("chalk");
const logger = require("morgan");
const cors = require("cors");
const getServerUrls = require("./utils/getServerUrls");
const { requireRouteFiles, updateAppRoutes } = require("./utils/updateAppRoutes");

const log = console.log;

const PORT = process.env.PORT || 5001;

const runServer = async (scriptConfig, onSuccess) => {
  const routeFiles = requireRouteFiles();

  const app = express();

  const { routes, protocol } = scriptConfig;
  const isHTTP = protocol === "http";

  app.use(cors());

  app.use(logger("dev"));

  const shouldStartServer = await updateAppRoutes(app, routes, routeFiles);

  if (shouldStartServer) {
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
  } else {
    // process.exit(1);
  }
};

module.exports = runServer;
