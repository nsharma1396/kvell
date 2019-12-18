// Since app will run in dev-mode
process.env.NODE_ENV = "development";

const chalk = require("chalk");
const runServer = require("../../lib/server");
const runLinter = require("../utils/runLinter");
const parseScriptsConfig = require("../utils/parseScriptsConfig");

process.on("unhandledRejection", exception => {
  // console.log();
  // console.log(chalk.red(`ERROR (${exception.code}): ${exception.message}`));
  console.log();
  console.log(chalk.red(`${exception.stack}`));
  console.log();

  process.exit(1);
});

const appSrcDirectory = process.cwd();

const executeStartScript = async () => {
  const parsedConfig = await parseScriptsConfig(appSrcDirectory);

  // const { isAppEntryPointValid, invalidErrorMessage } = validateEntryPoint(
  //   parsedConfig.appEntryPoint,
  //   appSrcDirectory
  // );

  // if (isAppEntryPointValid) {
  const lintStatus = runLinter(appSrcDirectory);
  if (lintStatus === "success") {
    runServer(parsedConfig, () => {
      // On success - do something if needed
    });
  }
  // } else {
  //   log();
  //   log(invalidErrorMessage);
  // }
};

executeStartScript();
