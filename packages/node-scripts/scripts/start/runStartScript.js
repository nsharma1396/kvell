const nodemon = require("nodemon");
// const path = require("path");
const chalk = require("chalk");
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
  nodemon({
    script: nodeArgs
      .concat(require.resolve("../../scripts/" + script))
      .concat(args.slice(scriptIndex + 1))
      .join(" "),
    // ignore: [path.resolve(process.cwd(), "./lintResult.json")],
    ext: "js json"
  });

  nodemon
    .on("start", function() {
      log();
      log(chalk.green("App is running..."));
      log();
    })
    .on("crash", function() {
      log(chalk.red("The app crashed due to some exception..."));
    })
    .on("restart", function(_files) {
      log(chalk.green("Restarted app due to changes..."));
    })
    .on("quit", function() {
      log();
      log("App has quit");
      process.exit();
    });
};

module.exports = runStartScript;
