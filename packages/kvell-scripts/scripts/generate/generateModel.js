const inquirer = require("inquirer");
const generateModelFiles = require("../utils/generateModelFiles");
const log = console.log;

const generateModel = async () => {
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
