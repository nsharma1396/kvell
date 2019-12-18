import arg from "arg";
import chalk from "chalk";
import { validateOptions } from "./validationHelpers";

export const parseArgVector = argv => {
  try {
    const parsedArgs = arg(
      {
        // "--database": String,
        "--help": Boolean,
        // "-d": "--database",
        // "-w": "--auto-template-watcher",
        "-h": "--help"
      },
      { argv }
    );
    return validateOptions(parsedArgs);
  } catch (err) {
    if (err.code === "ARG_UNKNOWN_OPTION") {
      log();
      log("Seems like you entered some invalid option(s):");
      log(chalk.redBright(err.message));
      log();
      log(
        `Use ${chalk.blueBright("create-node-app")} ${chalk.greenBright(
          "--help"
        )} for all valid options.`
      );
    } else {
      throw err;
    }
  }
};
