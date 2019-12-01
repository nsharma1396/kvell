const parseScriptsConfig = require("./parseScriptsConfig");
const createControllerFiles = require("../../lib/utils/createControllerFiles");
const {
  validateRouteFiles,
  createRouteFiles
} = require("../../lib/utils/updateAppRoutesAndModels");
const { validateModelFiles, createModelFiles } = require("../../lib/utils/updateAppModels");
const log = console.log;

const handleConfigChanges = async () => {
  const appSrcDirectory = process.cwd();
  const { routes, models } = await parseScriptsConfig(appSrcDirectory);
  const { allRoutesResolved, unresolvedRouteFiles } = validateRouteFiles(routes);
  const { allModelsResolved, unresolvedModelFiles } = validateModelFiles(models);

  if (!allRoutesResolved) {
    // onConfigChange();
    log();
    log(
      `Creating route file template for the new route${
        unresolvedRouteFiles.length === 1 ? "" : "s"
      }`
    );
    log();
    createRouteFiles(unresolvedRouteFiles, routes);
    createControllerFiles(unresolvedRouteFiles, routes);
  }
  if (!allModelsResolved) {
    log();
    log(
      `Creating model file template for the new model${
        unresolvedModelFiles.length === 1 ? "" : "s"
      }`
    );
    log();
    createModelFiles(unresolvedModelFiles, models);
  }
};

module.exports = handleConfigChanges;
