const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

const generateModelTemplate = (modelName, dbName, dbPluginName) =>
  `//eslint-disable-next-line no-unused-vars
const ${dbName} = require("${dbPluginName}").dbLib;

// Create your ${capitalizeFirstLetter(modelName)} model's schema here and export it.
module.exports = {}`;

module.exports = generateModelTemplate;
