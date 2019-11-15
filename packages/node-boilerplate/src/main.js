// import chalk from "chalk";
import {
  validatePackageName,
  doesDirectoryAlreadyExists
} from "./helpers/validationHelpers";
import { createProject } from "./helpers/createProject";
import { parseArgVector } from "./helpers/parseArgVector";

// const log = console.log;

export const createNodeApp = argv => {
  const validatedArgs = parseArgVector(argv);
  if (validatedArgs.valid) {
    const {
      packageName,
      databaseName,
      enableAutoWatchers
    } = validatedArgs.argsData;

    const isPackageNameValid =
      validatePackageName(packageName) &&
      doesDirectoryAlreadyExists(packageName);

    if (isPackageNameValid) {
      createProject(packageName, databaseName, enableAutoWatchers);
    }
  }
};
