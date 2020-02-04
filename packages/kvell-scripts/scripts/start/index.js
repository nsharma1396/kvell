// Since app will run in dev-mode
process.env.NODE_ENV = "development";

const chalk = require("chalk");
const runServer = require("../../lib/server");
const runLinter = require("../utils/runLinter");
const parseScriptsConfig = require("../utils/parseScriptsConfig");

process.on("unhandledRejection", exception => {
  console.log();
  console.log(chalk.red(`${exception.stack}`));
  console.log();

  process.exit(1);
});

const appSrcDirectory = process.cwd();

const executeStartScript = async () => {
  const { parseEnvironmentVariables } = require("../../lib/utils/parseEnvironmentVariables");
  parseEnvironmentVariables();

  const parsedConfig = await parseScriptsConfig(appSrcDirectory);

  const lintStatus = runLinter(appSrcDirectory);
  if (lintStatus === "success") {
    runServer(parsedConfig);
  }
};

executeStartScript();
