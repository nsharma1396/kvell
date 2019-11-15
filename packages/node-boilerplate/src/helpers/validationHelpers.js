import validateNpmPackageName from "validate-npm-package-name";
import chalk from "chalk";
import { existsSync } from "fs";

const log = console.log;

export const validatePackageName = packageName => {
  if (packageName) {
    const validationResult = validateNpmPackageName(packageName);
    if (
      validationResult.validForNewPackages &&
      validationResult.validForOldPackages
    ) {
      return true;
    } else {
      const errors = [
        ...(validationResult.warnings || []),
        ...(validationResult.errors || [])
      ];
      log();
      log(
        `Could not create project with the name ${chalk.bold.red(
          `'${packageName}'`
        )}`
      );
      log(
        `The name '${chalk.bold.red(
          `'${packageName}'`
        )}' violates the following npm naming restrictions:`
      );
      log();
      errors.forEach(error => {
        log(chalk.bold.red(`* ${error}`));
      });
      log();
      return false;
    }
  } else {
    // No project directory specified
    log();
    log("Please specifiy a project directory:");
    log(
      `  ${chalk.blue("create-node-app")} ${chalk.green("<project-directory>")}`
    );
    log();
    log("For example:");
    log(`  ${chalk.blue("create-node-app")} ${chalk.green("my-node-app")}`);
    log();
    log("This directory name will also be your projects's name.");
    return false;
  }
};

export const validateOptions = parsedArgs => {
  let databaseName = parsedArgs["--database"] || "mongodb";
  const packageName = parsedArgs._[0],
    enableAutoWatchers = parsedArgs["--auto-template-watcher"];

  if (databaseName !== "mongodb" && databaseName !== "postgres") {
    log();
    log(`The boilerplate supports the following databases only:`);
    log(chalk.redBright("*mongodb"));
    log(chalk.redBright("*postgres"));
    log();
    return {
      valid: false
    };
  } else {
    return {
      valid: true,
      argsData: {
        packageName,
        databaseName,
        enableAutoWatchers
      }
    };
  }
};

export const doesDirectoryAlreadyExists = directoryName => {
  const directoryParentPath = process.cwd();
  const directoryPath = `${directoryParentPath}/${directoryName}`;
  if (existsSync(directoryPath)) {
    log(
      `Could not create project with the name ${chalk.bold.yellow(
        `'${directoryName}'`
      )}`
    );
    log();
    log(
      `Directory ${chalk.bold.yellow(
        `'${directoryName}'`
      )} already exists in ${chalk.bold.magenta(`'${directoryPath}'`)}`
    );
    log();
    return false;
  } else {
    return true;
  }
};
