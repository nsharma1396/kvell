const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

const generateModelFunctionalityTemplate = modelName =>
  `// eslint-disable-next-line no-unused-vars
const ${capitalizeFirstLetter(modelName)} = require("./${modelName}Model");`;

module.exports = generateModelFunctionalityTemplate;
