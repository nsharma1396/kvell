import chalk from "chalk";
import { resolve } from "path";
import { mkdir, writeFile, readFile } from "fs";
import { copy, remove } from "fs-extra";
import { promisify } from "util";
import { spawn } from "child_process";

const makeDir = promisify(mkdir);
const readFileFromPath = promisify(readFile);
const writeFileToPath = promisify(writeFile);

const log = console.log;

const makeDirectory = async projectDirectoryPath => {
  try {
    await makeDir(projectDirectoryPath);
    return "success";
  } catch (exception) {
    log();
    log("Could not create directory.");
    log();
    log("Error detail:");
    log(chalk.redBright(exception.message));
    log();
    // process.exit(0);
    // return { status: "error" };
    throw exception;
  }
};

const copyTemplate = async (
  databaseName,
  templateFolderPath,
  projectDirectoryPath,
  directoryName
) => {
  try {
    await copy(templateFolderPath, projectDirectoryPath);
    log(
      chalk.greenBright(
        `Added ${chalk.blue(databaseName)} template to ${directoryName}`
      )
    );
    log();
  } catch (exception) {
    log();
    log("Could not add boilerplate template.");
    log();
    log(chalk.redBright(exception.message));
    log();
  }
};

const updatePackageJSON = async (projectDirectoryPath, directoryName) => {
  try {
    const pathToPackageJSON = `${projectDirectoryPath}/package.json`;
    const packageJSON = await readFileFromPath(pathToPackageJSON, "utf-8");
    log();
    const parsedPackageJSON = JSON.parse(packageJSON);
    parsedPackageJSON.name = directoryName;
    const stringifiedJSON = JSON.stringify(parsedPackageJSON, null, 2);
    await writeFileToPath(pathToPackageJSON, stringifiedJSON);
    return "success";
  } catch (exception) {
    log("There was an issue while creating the template.");
    log(chalk.redBright(`Error: ${exception.message}`));
    // process.exit(0);
    throw exception;
  }
};

const installDependencies = async directoryPath => {
  // Change current working directory to the project directory
  log("Installing dependencies...");
  log();
  return new Promise((resolve, reject) => {
    // process.chdir(directoryPath);
    const command = "npm";
    const args = ["install", "--save", "--save-exact", "--loglevel", "error"];
    const child = spawn(command, args, {
      cwd: directoryPath,
      stdio: "inherit"
    });
    child.on("close", code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
};

export const createProject = async (
  directoryName,
  databaseName,
  enableAutoWatchers
) => {
  const currentPathURL = import.meta.url;
  const currentPathName = new URL(currentPathURL).pathname;
  const resolvedPath = resolve(
    currentPathName,
    `../../../templates${
      enableAutoWatchers
        ? "/autoWatcherTemplates"
        : "/withoutAutoWatcherTemplates"
    }`,
    databaseName
  );

  const templateFolderPath = resolvedPath;

  const projectDirectoryParentPath = process.cwd();
  const projectDirectoryPath = `${projectDirectoryParentPath}/${directoryName}`;

  log();
  log(
    `Creating new Node boilerplate in ${chalk.bold.green(
      projectDirectoryPath
    )} with database as ${chalk.bold.green(databaseName)}.`
  );
  log();

  try {
    await makeDirectory(projectDirectoryPath);

    log(`Created directory ${chalk.greenBright(directoryName)}`);
    log();
    log("Adding boilerplate template...");

    await copyTemplate(
      databaseName,
      templateFolderPath,
      projectDirectoryPath,
      directoryName
    );

    await updatePackageJSON(projectDirectoryPath, directoryName);

    await installDependencies(projectDirectoryPath);
  } catch {
    log(`Removing directory ${directoryName}...`);
    log();
    await remove(projectDirectoryPath);
    log("Directory removed.");
    process.exit(0);
  }
};
