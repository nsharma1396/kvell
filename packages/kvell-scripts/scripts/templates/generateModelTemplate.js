const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

const generateModelTemplate = modelName =>
  `
// Create your ${capitalizeFirstLetter(modelName)} model's schema here and export it.

module.exports = {}`;

module.exports = generateModelTemplate;
