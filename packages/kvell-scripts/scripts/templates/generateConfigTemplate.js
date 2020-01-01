const generateConfigTemplate = updatedConfig =>
  `module.exports = ${JSON.stringify(updatedConfig, null, 2)};`;

module.exports = generateConfigTemplate;
