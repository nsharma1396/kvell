const path = require("path");
const chalk = require("chalk");
const pm2 = require("pm2");
const log = console.log;

let buildScripts = [
  "start",
  "stop",
  "delete",
  "show",
  "status",
  "restart",
  "logs",
  "flush",
  "startup"
];

const processName = "kvell-scripts-app";

const runBuildScript = (script, nodeArgs) => {
  let buildScript;

  for (let index = 0; index < nodeArgs.length; index++) {
    if (buildScripts.indexOf(nodeArgs[index]) !== -1) {
      buildScript = nodeArgs[index];
      nodeArgs.splice(index, 1);
      break;
    }
  }

  if (buildScript) {
    // let scriptsArray = nodeArgs.concat(buildScript);

    const scriptPath = require.resolve(path.join("..", "..", "scripts", script));

    // // Append the file path only if it is needed by the pm2 api
    // if (buildScript === "start" || buildScript === "stop" || buildScript === "restart") {
    //   scriptsArray = scriptsArray.concat(scriptPath);
    // }

    // const nodeCommand = "pm2";

    pm2.connect(function(err) {
      if (err) {
        error(err);
        process.exit(2);
      }

      if (buildScript === "start") {
        log(chalk.green("Starting production server...\n"));
        pm2.start(
          {
            name: processName,
            script: scriptPath,
            cwd: process.cwd(),
            output: path.join(process.cwd(), "logs", "build_output.log"),
            error: path.join(process.cwd(), "logs", "build_errors.log"),
            pid: path.join(process.cwd(), "logs", "build-name-id.pid")
            // exec_mode: "cluster", // Allows your app to be clustered
            // instances: 4, // Optional: Scales your app by 4
            // max_memory_restart: "100M" // Optional: Restarts your app if it reaches 100Mo
          },
          function(err, apps) {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }
            log(chalk.green("Production server started."));
          }
        );
      } else if (buildScript === "status") {
        log(chalk.green("Loading status for production server...\n"));

        pm2.describe(processName, function(err, proc) {
          pm2.disconnect(); // Disconnects from PM2
          if (err) {
            throw err;
          }

          if (proc && proc[0]) {
            const processStatus = proc[0].pm2_env.status;
            let chalkColor = "whiteBright";
            if (processStatus === "online") {
              chalkColor = "greenBright";
            } else if (processStatus === "stopped" || processStatus === "stopping") {
              chalkColor = "redBright";
            }
            log(proc);
            log();
            log(`Server status: ${chalk[chalkColor](processStatus)}`);
          } else {
            log(chalk.red(`No build processes found\n`));
          }
        });
      } else if (buildScript === "stop") {
        log(chalk.green("Stopping the production server...\n"));
        pm2.stop(processName, (err, proc) => {
          pm2.disconnect(); // Disconnects from PM2
          if (err) {
            throw err;
          }
          log(proc);
          log();
          log(`Successfully stopped the server.`);
        });
      } else if (buildScript === "delete") {
        log(chalk.green("Deleting pm2 process for production server...\n"));

        pm2.delete(processName, function(err, proc) {
          pm2.disconnect(); // Disconnects from PM2
          if (err) {
            throw err;
          }

          log(proc);
          log();
          log("Successfully deleted the pm2 process");
        });
      }
    });
  } else {
    log(
      chalk.redBright(
        "ERROR: Invalid options passed to build script. Please provide valid options to build script."
      )
    );
    log("Valid options include:\n");
    log(buildScripts.reduce((result, script, index) => `${result}${index + 1}. ${script}\n`, ""));
  }
};

module.exports = runBuildScript;
