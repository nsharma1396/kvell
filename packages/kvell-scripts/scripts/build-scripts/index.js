// Since app will run in production-mode
process.env.NODE_ENV = "production";

const chalk = require("chalk");
const runServer = require("../../lib/server").runServer;
// const runLinter = require("../utils/runLinter");
const parseScriptsConfig = require("../utils/parseScriptsConfig");
const parsePluginConfig = require("../utils/parsePluginConfig");

process.on("unhandledRejection", (exception) => {
  console.log();
  console.log(chalk.red(`${exception.stack}`));
  console.log();

  process.exit(1);
});

const appSrcDirectory = process.cwd();

const executeStartScript = async () => {
  const { parseEnvironmentVariables } = require("../../lib/utils/parseEnvironmentVariables");
  parseEnvironmentVariables();

  const configResult = await Promise.all([
    parseScriptsConfig(appSrcDirectory),
    parsePluginConfig(appSrcDirectory),
  ]);

  const parsedConfig = Object.assign({}, configResult[0], configResult[1]);

  // Avoid linting in production
  // const lintStatus = runLinter(appSrcDirectory);
  // if (lintStatus === "success") {
  runServer(parsedConfig);
  // }
};

executeStartScript();
