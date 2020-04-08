const path = require("path");
const chalk = require("chalk");
const pm2 = require("pm2");
// const arg = require("arg");
const fs = require("fs");
const log = console.log;

let buildScripts = ["start", "stop", "delete", "status", "restart", "flush", "startup", "list"];

// const processPm_id = "kvell-scripts-app";

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

    let processPID,
      processPm_id,
      delimeter = "%____%",
      fileExists = false;

    try {
      const pathToPid = path.join(process.cwd(), "logs", "build-logs", "build_pm.pid");
      if (fs.existsSync(pathToPid)) {
        [processPID, processPm_id] = fs.readFileSync(pathToPid, "utf-8").split(delimeter);
        if (
          fs.existsSync(path.join(process.cwd(), "logs", "build-logs", `build-${processPm_id}.pid`))
        ) {
          fileExists = true;
        }
      }
    } catch (err) {
      fileExists = false;
    }

    // Append the file path only if it is needed by the pm2 api
    // if (buildScript === "start" || buildScript === "stop" || buildScript === "restart") {
    //   scriptsArray = scriptsArray.concat(scriptPath);
    // }

    // const nodeCommand = "pm2";
    // const args = arg(
    //   {
    //     "--name": String
    //   },
    //   {
    //     argv: nodeArgs,
    //     permissive: false
    //   }
    // );

    // const processName = args["--name"];

    // To-do: simplify the condition :|
    if (
      (!fileExists &&
        (processPm_id ||
          buildScript === "start" ||
          buildScript === "startup" ||
          buildScript === "list")) ||
      (fileExists && buildScript !== "start")
    ) {
      pm2.connect(function (err) {
        if (err) {
          console.error(err);
          process.exit(2);
        }

        if (buildScript === "start") {
          log(chalk.green("Starting production server...\n"));
          const logDirPaths = {
            output: path.join(process.cwd(), "logs", "build-logs", "build_output.log"),
            error: path.join(process.cwd(), "logs", "build-logs", "build_errors.log"),
            pid: path.join(process.cwd(), "logs", "build-logs", "build.pid"),
            pm_id: path.join(process.cwd(), "logs", "build-logs", "build_pm.pid"),
          };

          pm2.start(
            {
              // name: processPm_id,
              script: scriptPath,
              cwd: process.cwd(),
              output: logDirPaths.output,
              error: logDirPaths.error,
              pid: logDirPaths.pid,
              // exec_mode: "cluster", // Allows your app to be clustered
              // instances: 4, // Optional: Scales your app by 4
              // max_memory_restart: "100M" // Optional: Restarts your app if it reaches 100Mo
            },
            function (err, proc) {
              pm2.disconnect(); // Disconnects from PM2
              if (err) {
                throw err;
              }

              fs.writeFileSync(
                `${logDirPaths.pm_id}`,
                `${proc[0].pid}${delimeter}${proc[0].pm2_env.pm_id}`
              );

              log("Process details:\n");

              log(proc);
              log();
              log(chalk.green("Production server started.\n"));

              log("You can check the logs in the following paths:\n");
              log(
                chalk.yellow(
                  `Output logs: ${logDirPaths.output}\nError logs: ${logDirPaths.error}\nPid Logs: ${logDirPaths.pid}\n`
                )
              );
            }
          );
        } else if (buildScript === "status") {
          log(chalk.green("Loading status for production server...\n"));

          pm2.describe(processPm_id, function (err, proc) {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }

            console.log(proc);

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
              log(`Server status: ${chalk[chalkColor](processStatus)}\n`);
            } else {
              log(
                `${chalk.bgRedBright.whiteBright("ERROR!")} ${chalk.redBright(
                  `No build processes found with the id ${processPm_id}\n`
                )}`
              );
            }
          });
        } else if (buildScript === "stop") {
          log(chalk.green("Stopping the production server...\n"));
          pm2.stop(processPm_id, (err, proc) => {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }
            log(proc);
            log();
            log(`Successfully stopped the server.\n`);
          });
        } else if (buildScript === "delete") {
          log(chalk.green("Deleting pm2 process for production server...\n"));

          pm2.delete(processPm_id, function (err, proc) {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }

            const pm_idFile = path.join(process.cwd(), "logs", "build-logs", "build_pm.pid");
            fs.unlinkSync(pm_idFile);

            log(proc);
            log();
            log("Successfully deleted the pm2 process\n");
          });
        } else if (buildScript === "restart") {
          log(chalk.green("Restarting the production server...\n"));
          pm2.restart(processPm_id, (err, proc) => {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }
            log(proc);
            log();
            log(`Successfully restarted the server.\n`);
          });
          // } else if (buildScript === "reload") {
          //   log(chalk.green("Restarting the production server...\n"));
          //   pm2.reload(processPm_id, (err, proc) => {
          //     pm2.disconnect(); // Disconnects from PM2
          //     if (err) {
          //       throw err;
          //     }
          //     log(proc);
          //     log();
          //     log(`Successfully restarted the server.\n`);
          //   });
        } else if (buildScript === "startup") {
          // log(chalk.green("Restarting the production server...\n"));
          log("Startup scripts are not available yet.");
          pm2.disconnect(); // Disconnects from PM2
          // pm2.startup(nodeArgs[0], (err) => {
          //   console.log("here");
          //   pm2.disconnect(); // Disconnects from PM2
          //   if (err) {
          //     throw err;
          //   }
          // });
        } else if (buildScript === "flush") {
          log(chalk.yellow("Flushing all the logs...\n"));
          pm2.flush(processPm_id, function (err, result) {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }
            log(result);
            log(chalk.green("Logs flushed successfully!\n"));
          });
        } else if (buildScript === "list") {
          log(chalk.green("Getting all the running build processes...\n"));
          pm2.list((err, processDescriptionList) => {
            pm2.disconnect(); // Disconnects from PM2
            if (err) {
              throw err;
            }
            log("Current running processes:\n");
            log(processDescriptionList);
            log();
            log(`Total running processes: ${processDescriptionList.length}\n`);
          });
        }
      });
    } else {
      if (fileExists && buildScript === "start") {
        log(
          `${chalk.bgRedBright.whiteBright("ERROR!")}  ${chalk.redBright(
            "Production server already running with pid: ",
            processPID
          )}\n`
        );
      } else if (!fileExists && (buildScript !== "startup" || buildScript !== "list")) {
        log(
          `${chalk.bgRedBright.whiteBright("ERROR!")}  ${chalk.redBright(
            "No build process exists for this application."
          )}\n`
        );
      } else {
        log(
          `${chalk.bgRedBright.whiteBright("ERROR!")}  ${chalk.redBright(
            "There was an error while executing " + buildScript + " script."
            // "Please provide a process name with the --name option"
          )}\n`
        );
      }
    }
  } else {
    log(
      `${chalk.bgRedBright.whiteBright("ERROR!")}  ${chalk.redBright(
        "Invalid options passed to build script. Please provide valid options to build script.\n"
      )}`
    );
    log("Valid options include:\n");
    log(buildScripts.reduce((result, script, index) => `${result}${index + 1}. ${script}\n`, ""));
  }
};

module.exports = runBuildScript;
