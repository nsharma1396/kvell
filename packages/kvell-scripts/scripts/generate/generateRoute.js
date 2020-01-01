const inquirer = require("inquirer");
const generateRouteFiles = require("../utils/generateRouteFiles");
const log = console.log;

const generateRoute = async () => {
  log();
  log("Please answer the following questions...");
  log();

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "routeName",
      message: "Enter the route's name",
      // validate: answer => {
      // // Validate the route name
      //   return "Invalid route name";
      // },
      suffix: " (this will be used as the file name):"
    },
    {
      type: "input",
      name: "pathName",
      message: "Enter the root URL for the route",
      suffix: " (example: '/home'):"
    }
  ]);
  generateRouteFiles(answers.routeName, answers.pathName);
};

module.exports = generateRoute;
