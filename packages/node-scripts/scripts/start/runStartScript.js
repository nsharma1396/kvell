const nodemon = require("nodemon");
const path = require("path");
const chalk = require("chalk");
const chokidar = require("chokidar");
const clearConsole = require("../utils/clearConsole");
const handleConfigChanges = require("../utils/handleConfigChanges");
// const getUrls = require("../utils/getUrls");

const log = console.log;
// const spawn = require("cross-spawn").spawn;

const runStartScript = (args, script, scriptIndex, nodeArgs) => {
  // // For running with node
  // let nodeCommand = "node";
  // // Takes too much time
  // // const doesNodemonExists = spawn.sync("npm", ["list", "-g", "nodemon"]).status === 0;
  // // if (doesNodemonExists) {
  // //   nodeCommand = "nodemon";
  // // }
  // spawn.sync(
  //   nodeCommand,
  //   nodeArgs.concat(require.resolve("../../scripts/" + script)).concat(args.slice(scriptIndex + 1)),
  //   { stdio: "inherit" }
  // );

  // For running with nodemon
  let hasAppRanOnce = false;

  const projectPath = process.cwd();
  const projectName = path.basename(projectPath);
  const appConfigFilePath = path.resolve(projectPath, ".", "nodescript.config.json"); // as we will use chokidar to watch it

  nodemon({
    script: nodeArgs
      .concat(require.resolve("../../scripts/" + script))
      .concat(args.slice(scriptIndex + 1))
      .join(" "),
    // ignore: [appConfigFilePath],
    ext: "js mjs json"
  });

  const printOptions = {
    shouldClear: true,
    canToggleShouldClear: false
  };

  async function handleConfigFileChange() {
    // function onConfigChange() {
    //   printOptions.shouldClear = false;
    // }
    await handleConfigChanges();
    // printOptions.canToggleShouldClear = true;
  }

  nodemon
    .on("start", function() {
      /*
      // Commenting the models part for now as this will run before the db file can be initialized hence causing
      // errors like: sequelize.define is not a function

      if (!hasAppRanOnce) {
        hasAppRanOnce = true;
        // clearConsole();
        const watcher = chokidar.watch(appConfigFilePath, {
          ignored: /(^|[/\\])\../, // ignore dotfiles
          persistent: true
        });
        watcher.on("change", handleConfigFileChange);
      }
      */

      log(chalk.green(`Running ${chalk.yellow(projectName)} in development mode...`));
    })
    .on("crash", function() {
      log(chalk.red("The app crashed due to some exception..."));
    })
    .on("restart", function() {
      // console.log(printOptions);
      // if (printOptions.shouldClear) {
      clearConsole();
      // } else {
      //   if (printOptions.canToggleShouldClear) {
      //     printOptions.shouldClear = true;
      //   }
      // }
      printOptions.shouldClear = true;
      log(chalk.green(`Restarting ${chalk.yellow(projectName)} due to changes...`));
      // log();
    })
    .on("quit", function() {
      log();
      log();
      log(chalk.yellowBright("App stopped"));
      process.exit();
    });
};

module.exports = runStartScript;
