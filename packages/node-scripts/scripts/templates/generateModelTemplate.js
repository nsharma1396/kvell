const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

const generateModelTemplate = modelName =>
  `//eslint-disable-next-line no-unused-vars
const ${process.env.DB_NAME} = ("@tek/node-scripts-dev/db").dbLib;

// Create your ${capitalizeFirstLetter(modelName)} model's schema here and export it.
module.exports = {}`;

module.exports = generateModelTemplate;
