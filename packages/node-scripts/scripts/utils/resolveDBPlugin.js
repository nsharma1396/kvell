const { pathExistsSync } = require("../utils/fsWrapper");

const resolveDBPlugin = pluginPath => {
  let plugin;
  if (pathExistsSync(pluginPath)) {
    plugin = require(pluginPath);
  } else {
    return false;
  }
  return plugin;
};

module.exports = resolveDBPlugin;
