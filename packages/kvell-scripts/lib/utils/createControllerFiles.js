const path = require("path");
const chalk = require("chalk");
const { writeToFile } = require("../../scripts/utils/fsWrapper");
const generateControllerTemplate = require("../../scripts/templates/generateControllerTemplate");
const generateControllerIndexTemplate = require("../../scripts/templates/generateControllerIndexTemplate");

const log = console.log;

const createControllerFiles = async (unresolvedFiles, allcontrollers) => {
  const appDirectoryPath = process.cwd();
  const controllerDirPath = path.resolve(appDirectoryPath, "controllers");
  for (const unresolvedFile of unresolvedFiles) {
    log();
    const fileName = unresolvedFile.name;
    const fileExt = ".js";
    const filePath = path.resolve(controllerDirPath, `${fileName}${fileExt}`);
    log(chalk.blue(`Creating '${fileName}${fileExt}' in '${filePath}'...`));
    const controllerTemplateData = generateControllerTemplate(fileName);
    await writeToFile(filePath, controllerTemplateData);
    log(chalk.green(`Created '${fileName}${fileExt}'...`));
  }
  log();
  const controllerIndexPath = path.resolve(controllerDirPath, "index.js");
  const controllerIndexData = generateControllerIndexTemplate(allcontrollers);
  await writeToFile(controllerIndexPath, controllerIndexData);
  log(`Updated ${controllerIndexPath}...`);
  log();
  return true;
};

module.exports = createControllerFiles;
