const nodemon = require("nodemon");
const path = require("path");
const chalk = require("chalk");
const arg = require("arg");
const spawn = require("cross-spawn").spawn;
const clearConsole = require("../utils/clearConsole");

const log = console.log;

const runStartScript = (script, nodeArgs) => {
  // `no-watch` flag will run the server in "watch mode" (i.e. with something like nodemon) if set to false,
  // else it will run it using a spawned node process
  const parsedArgs = arg({
    "--no-watch": Boolean
  });

  const enableWatchMode = !parsedArgs["--no-watch"];

  const scriptsArray = nodeArgs.concat(require.resolve("../../scripts/" + script));
  // .concat(args.slice(scriptIndex + 1));

  if (!enableWatchMode) {
    // For running with node
    const nodeCommand = "node";
    // Takes too much time
    // const doesNodemonExists = spawn.sync("npm", ["list", "-g", "nodemon"]).status === 0;
    // if (doesNodemonExists) {
    //   nodeCommand = "nodemon";
    // }
    spawn(nodeCommand, scriptsArray, { stdio: "inherit" });
  } else {
    // For running with nodemon

    const projectPath = process.cwd();
    const projectName = path.basename(projectPath);

    nodemon({
      script: scriptsArray.join(" "),
      // ignore: [appConfigFilePath],
      ext: "js mjs json"
    });

    nodemon
      .on("start", function() {
        log(chalk.green(`Running ${chalk.yellow(projectName)} in development mode...`));
      })
      .on("crash", function() {
        log(chalk.red("The app crashed due to some exception..."));
      })
      .on("restart", function() {
        clearConsole();
        log(chalk.green(`Restarting ${chalk.yellow(projectName)} due to changes...`));
      })
      .on("quit", function() {
        log();
        log();
        log(chalk.yellowBright("App stopped"));
        process.exit();
      });
  }
};

module.exports = runStartScript;
