const path = require("path");
const chalk = require("chalk");
const { writeToFile } = require("../../scripts/utils/fsWrapper");
const generateControllerTemplate = require("../../scripts/templates/generateControllerTemplate");
const generateControllerIndexTemplate = require("../../scripts/templates/generateControllerIndexTemplate");

const log = console.log;

const createRouteFiles = async (unresolvedFiles, allRoutes) => {
  const appDirectoryPath = process.cwd();
  const routeDirPath = path.resolve(appDirectoryPath, "routes");
  for await (const unresolvedFile of unresolvedFiles) {
    log();
    const fileName = unresolvedFile.name;
    const fileExt = ".js";
    const filePath = path.resolve(routeDirPath, `${fileName}${fileExt}`);
    log(chalk.blue(`Creating ${fileName}${fileExt} in ${filePath}...`));
    const routeTemplateData = generateControllerTemplate(fileName);
    await writeToFile(filePath, routeTemplateData);
    log(chalk.green(`Created ${fileName}${fileExt}...`));
  }
  log();
  const routeIndexPath = path.resolve(routeDirPath, "index.js");
  const routeIndexData = generateControllerIndexTemplate(allRoutes);
  await writeToFile(routeIndexPath, routeIndexData);
  log(`Updated ${routeIndexPath}...`);
  log();
  return true;
};

module.exports = createRouteFiles;
