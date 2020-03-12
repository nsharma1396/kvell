const path = require("path");
const chalk = require("chalk");
const pathExists = require("../scripts/utils/fsWrapper").pathExistsSync;

function getDevLogger() {
  const log = console.log;
  const appLogPath = path.resolve(process.cwd(), "logs", "appLog.log");
  let devLog;
  if (pathExists(appLogPath)) {
    devLog = require("simple-node-logger").createSimpleFileLogger(appLogPath);
  } else {
    const noFilePresent = () =>
      log(
        `${chalk.bgYellowBright.blackBright(
          "WARN"
        )} You tried using dev-logger, but there was no 'logs/appLog.log' file found. Please add a 'logs' folder and an 'appLog.log' file in it to use the logger.`
      );
    devLog = {
      trace: noFilePresent,
      debug: noFilePresent,
      info: noFilePresent,
      warn: noFilePresent,
      error: noFilePresent,
      fatal: noFilePresent
    };
  }
  return devLog;
}

module.exports = getDevLogger;
