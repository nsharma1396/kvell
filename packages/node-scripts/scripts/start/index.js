// Since app will run in dev-mode
process.env.NODE_ENV = "development";

const chalk = require("chalk");
const runServer = require("../../src/server");
const runLinter = require("../utils/runLinter");
const validateEntryPoint = require("./validateEntryPoint");
const parseScriptsConfig = require("../utils/parseScriptsConfig");

const log = console.log;

const appSrcDirectory = process.cwd();

const executeStartScript = async () => {
  const parsedConfig = await parseScriptsConfig(appSrcDirectory);

  const { isAppEntryPointValid, invalidErrorMessage, entryPointAbsolutePath } = validateEntryPoint(
    parsedConfig.appEntryPoint,
    appSrcDirectory
  );

  if (isAppEntryPointValid) {
    const lintStatus = runLinter(appSrcDirectory);
    if (lintStatus === "success") {
      log();
      log(chalk.blue("Starting the server..."));
      log();
      runServer(() => {
        // Require the starting point of the app when server starts running successfully
        require(entryPointAbsolutePath);
      });
    }
  } else {
    log();
    log(invalidErrorMessage);
  }
};

executeStartScript();
