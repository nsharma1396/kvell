const parseScriptsConfig = require("./parseScriptsConfig");
const createControllerFiles = require("../../lib/utils/createControllerFiles");
const { requireRouteFiles, createRouteFiles } = require("../../lib/utils/updateAppRoutes");
const log = console.log;

const handleConfigChanges = async () => {
  const appSrcDirectory = process.cwd();
  const [routeFiles, parsedScriptsConfig] = await Promise.all([
    requireRouteFiles(),
    parseScriptsConfig(appSrcDirectory)
  ]);
  const unresolvedRoutes = [];
  parsedScriptsConfig.routes.forEach(route => {
    if (!routeFiles[route.name]) {
      unresolvedRoutes.push(route);
    }
  });
  if (unresolvedRoutes.length) {
    // onConfigChange();
    log();
    log(
      `Creating route file template for the new route${unresolvedRoutes.length === 1 ? "" : "s"}`
    );
    log();
    createRouteFiles(unresolvedRoutes, parsedScriptsConfig.routes);
    createControllerFiles(unresolvedRoutes, parsedScriptsConfig.routes);
  } else {
    // Restart the server somehow
  }
};

module.exports = handleConfigChanges;
