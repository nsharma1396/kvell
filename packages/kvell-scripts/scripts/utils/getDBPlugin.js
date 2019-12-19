const path = require("path");
const chalk = require("chalk");
const resolveDBPlugin = require("./resolveDBPlugin");

const pluginName = process.env.DB_PLUGIN_NAME;

if (pluginName) {
  const pluginPath = path.resolve(process.cwd(), "node_modules", pluginName);

  let dbPlugin;
  // try {
  dbPlugin = resolveDBPlugin(pluginPath);
  // } catch (exception) {}
  if (!dbPlugin) {
    const errorObject = new Error(
      `The plugin '${chalk.bold(
        pluginName
      )}' is probably not installed. Please try installing it or check if you have installed a valid plugin`
    );
    errorObject.code = "MODULE_NOT_FOUND";
    throw errorObject;
  }

  module.exports = {
    // dbLib: dbPlugin.dbLib,
    // dbInstance: dbPlugin.dbInstance,
    initHandler: dbPlugin.initHandler
  };
} else {
  module.exports = {
    // dbLib: "No database plugin specified",
    // dbInstance: "No database plugin specified",
    initHandler: () => Promise.resolve()
  };
}
