const inquirer = require("inquirer");
const generateModelFiles = require("../utils/generateModelFiles");
const { parseEnvironmentVariables } = require("../../lib/utils/parseEnvironmentVariables");
const log = console.log;

const generateModel = async () => {
  // Parse environment variables so that it is available for model-template creation
  parseEnvironmentVariables();

  log();
  log("Please answer the following question...");
  log();

  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "modelName",
      message: "Enter the model's name",
      // validate: answer => {
      // // Validate the route name
      //   return "Invalid route name";
      // },
      suffix: " (this will be used as the file name):"
    }
  ]);
  generateModelFiles(answer.modelName);
};

module.exports = generateModel;
