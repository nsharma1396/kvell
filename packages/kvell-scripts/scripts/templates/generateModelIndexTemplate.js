const generateModelIndexTemplate = allModels => {
  let requireTemplate = "";
  let exportsTemplate = "module.exports = {\n";
  allModels.map((model, index) => {
    const modelName = model;
    requireTemplate += `const ${modelName} = require("./${modelName}");\n`;
    exportsTemplate += `  ${modelName}${index === allModels.length - 1 ? "" : ","}\n`;
  });
  exportsTemplate += "};";

  return `${requireTemplate}\n${exportsTemplate}`;
};

module.exports = generateModelIndexTemplate;
