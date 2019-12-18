const path = require("path");
const chalk = require("chalk");
const doesFileExistsInPath = require("../utils/doesFileExistsInPath");

const validateEntryPoint = (entryPoint = path.resolve("src", "index"), appSrcDirectory) => {
  const parsedEntryPoint = path.parse(entryPoint);
  const entryPointAbsolutePath = entryPoint ? path.resolve(appSrcDirectory, entryPoint) : "";
  const doesEntryPointExists = doesFileExistsInPath(entryPointAbsolutePath);
  const entryPointFileName = parsedEntryPoint.name;
  const entryPointFileDirectory = parsedEntryPoint.dir;
  const appEntryPoint = path.resolve(appSrcDirectory, entryPointFileDirectory, entryPointFileName);
  if (parsedEntryPoint.ext === ".js" && doesEntryPointExists) {
    return {
      isAppEntryPointValid: true,
      entryPointAbsolutePath
      // appEntryPoint,
      // entryPointFileName,
      // entryPointFileDirectory
    };
  } else {
    const invalidErrorMessage = `${chalk.red(
      `Error: App should have an entry point at '${appEntryPoint}'`
    )}\n\n${chalk.redBright(
      `Please create a file named '${entryPointFileName}' in '${entryPointFileDirectory}' directory as the entry point of your application.`
    )}\n${chalk.whiteBright(
      `The app should restart once you add the file. If it doesn't, try stopping and running the app again.`
    )}`;
    return {
      isAppEntryPointValid: false,
      invalidErrorMessage
    };
  }
};

module.exports = validateEntryPoint;
