const path = require("path");

/**
 * @param {{resolve: string, options: object}[]} pluginsArray
 */
async function resolvePlugins(plugins) {
  const syncHandlers = {};
  for (let plugin of plugins) {
    // Import the instance from "plugin/init" first so that instance is created before the main is required
    const pluginInstancePath = path.resolve(process.cwd(), "node_modules", plugin.resolve, "init");
    const PluginInstance = require(pluginInstancePath);
    await PluginInstance.createDBInstance(plugin.options);

    const pluginPath = path.resolve(process.cwd(), "node_modules", plugin.resolve);
    const pluginExport = require(pluginPath);
    syncHandlers[plugin.resolve] = pluginExport.initHandler;
  }
  return syncHandlers;
}

/**
 * @param {{resolve: string, options: object}[]} pluginsArray
 */
const getDBPlugins = pluginsArray => {
  return resolvePlugins(pluginsArray);
};

module.exports = getDBPlugins;
