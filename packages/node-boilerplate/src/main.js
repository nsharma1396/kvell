import arg from "arg";
import chalk from "chalk";
import {
  validatePackageName,
  doesDirectoryAlreadyExists,
  validateOptions
} from "./helpers/validationHelpers";
import { createDirectory } from "./helpers/createDirectory";

const log = console.log;

const parseArgVector = argv => {
  try {
    const parsedArgs = arg(
      {
        "--database": String,
        "-d": "--database"
      },
      { argv }
    );
    return validateOptions(parsedArgs);
  } catch (err) {
    if (err.code === "ARG_UNKNOWN_OPTION") {
      log(chalk.redBright(err.message));
    } else {
      throw err;
    }
  }
};

export const createNodeApp = argv => {
  const validatedArgs = parseArgVector(argv);
  if (validatedArgs.valid) {
    const { packageName, databaseName } = validatedArgs.argsData;

    const isPackageNameValid =
      validatePackageName(packageName) &&
      doesDirectoryAlreadyExists(packageName);

    if (isPackageNameValid) {
      createDirectory(packageName, databaseName);
      // Create new directory
      // Copy the template
      // Do `npm install`
    }
  }
};
