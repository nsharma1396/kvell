const path = require("path");
const chalk = require("chalk");
const { ensureDirSync } = require("./../../scripts/utils/fsWrapper");
const writeToFile = require("../../scripts/utils/fsWrapper").writeToFile;
const generateModelTemplate = require("../../scripts/templates/generateModelTemplate");
const generateModelFunctionalityTemplate = require("../../scripts/templates/generateModelFunctionalityTemplate");
const generateModelIndexTemplate = require("../../scripts/templates/generateModelIndexTemplate");

const log = console.log;

const requireModelFiles = () => {
  const modelsFileObject = require(path.resolve(process.cwd(), "models"));
  return modelsFileObject;
};

const validateModelFiles = models => {
  const modelFiles = requireModelFiles();
  let allModelsResolved = true,
    unresolvedModelFiles = [];
  models.forEach(model => {
    if (!modelFiles[model]) {
      allModelsResolved = false;
      unresolvedModelFiles.push(model);
    }
  });
  return {
    allModelsResolved,
    unresolvedModelFiles,
    modelFiles
  };
};

const createModelFiles = async (unresolvedFiles, allModels) => {
  const appDirectoryPath = process.cwd();
  const modelDirPath = path.resolve(appDirectoryPath, "models");
  for await (const unresolvedFile of unresolvedFiles) {
    // Create a model file
    log();
    const fileName = unresolvedFile;
    const fileExt = ".js";
    const currentModelDirPath = path.resolve(modelDirPath, `${fileName}`);
    const modelFilePath = path.resolve(currentModelDirPath, `index${fileExt}`);
    const modelFunctionalityFilePath = path.resolve(
      currentModelDirPath,
      `${fileName}Model${fileExt}`
    );
    log(chalk.blue(`Creating '${fileName}' model files in '${currentModelDirPath}'...`));
    const modelTemplateData = generateModelTemplate(fileName);
    const modelFunctionalityData = generateModelFunctionalityTemplate(fileName);
    ensureDirSync(currentModelDirPath);
    await writeToFile(modelFunctionalityFilePath, modelTemplateData);
    await writeToFile(modelFilePath, modelFunctionalityData);
    log(chalk.green(`Created '${fileName}${fileExt}'...`));
  }
  log();
  const modelIndexPath = path.resolve(modelDirPath, "index.js");
  const modelIndexData = generateModelIndexTemplate(allModels);
  await writeToFile(modelIndexPath, modelIndexData);
  log(`Updated ${modelIndexPath}...`);
  log();
  return true;
};

module.exports = {
  requireModelFiles,
  validateModelFiles,
  createModelFiles
};
