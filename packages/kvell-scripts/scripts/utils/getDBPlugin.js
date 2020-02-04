const path = require("path");

/**
 * @param {{resolve: string, options: object}[]} pluginsArray
 */
const getDBPlugins = pluginsArray => {
  const syncHandlers = {};
  pluginsArray.forEach(plugin => {
    // Import the instance from "plugin/init" first so that instance is created before the main is required
    const pluginInstancePath = path.resolve(process.cwd(), "node_modules", plugin.resolve, "init");
    const PluginInstance = require(pluginInstancePath);
    PluginInstance.createDBInstance(plugin.options);

    const pluginPath = path.resolve(process.cwd(), "node_modules", plugin.resolve);
    const pluginExport = require(pluginPath);
    syncHandlers[plugin.resolve] = pluginExport.initHandler;
  });
  return syncHandlers;
};

module.exports = getDBPlugins;
