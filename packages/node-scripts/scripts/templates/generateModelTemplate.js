const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

const generateModelTemplate = (modelName, dbName) =>
  `//eslint-disable-next-line no-unused-vars
const ${dbName} = require("kvell-scripts/db").dbLib;

// Create your ${capitalizeFirstLetter(modelName)} model's schema here and export it.
module.exports = {}`;

module.exports = generateModelTemplate;
