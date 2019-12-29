import chalk from "chalk";
import path from "path";
import { mkdir, writeFile, readFile } from "fs";
import url from "url";
import { copy, remove, ensureFile } from "fs-extra";
import { promisify } from "util";
import { runChildProcess } from "./runChildProcess";
import generateGitIgnoreTemplate from "./generateGitIgnoreTemplate";

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
  // databaseName,
  templateFolderPath,
  projectDirectoryPath,
  directoryName
) => {
  try {
    await copy(templateFolderPath, projectDirectoryPath);
    log(chalk.greenBright(`Added Node.js basic template to ${directoryName}`));
  } catch (exception) {
    log();
    log("Could not add boilerplate template.");
    log();
    log(chalk.redBright(exception.message));
    log();
  }
};

const ensureGitIgnore = async (projectDirectoryPath, _directoryName) => {
  const gitIgnorePath = path.resolve(projectDirectoryPath, ".gitignore");
  await ensureFile(gitIgnorePath);
  await writeFileToPath(gitIgnorePath, generateGitIgnoreTemplate());
};

// const ensureNpmrc = async (projectDirectoryPath, _directoryName) => {
//   const npmRcPath = path.resolve(projectDirectoryPath, ".npmrc");
//   await ensureFile(npmRcPath);
//   await writeFileToPath(npmRcPath, generateNpmRcTemplate());
// };

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

const initializeGit = async directoryPath => {
  const command = "git";
  const args = ["init"];
  const options = { cwd: directoryPath, stdio: "inherit" };

  try {
    log();
    // log("Initializing empty git repository...");
    log();
    await runChildProcess(command, args, options);
    log();
    // log(`${chalk.green("Initialized git repository.")}`);
    log();
    return true;
  } catch (exception) {
    log();
    log(`${chalk.red("Failed")} to initialize git repository.`);
    log("Skipping git initialization...");
    log();
    return false;
  }
};

const installDependencies = async directoryPath => {
  // Change current working directory to the project directory
  log("Installing dependencies...");
  log();
  // process.chdir(directoryPath);
  const command = "npm";
  const args = ["install", "--save", "--save-exact", "--loglevel", "error", "kvell-scripts"];
  const options = { cwd: directoryPath, stdio: "inherit" };
  await runChildProcess(command, args, options);
};

export const createProject = async directoryName => {
  const currentPathURL = import.meta.url;
  // Commenting URL since it is only available after Node v10.0.0
  // const currentPathName = new URL(currentPathURL).pathname;
  const currentPathName = url.fileURLToPath(currentPathURL);
  const resolvedPath = path.resolve(currentPathName, `..`, `..`, `..`, `templates`, `basic`); // databaseName);

  const templateFolderPath = resolvedPath;

  const projectDirectoryParentPath = process.cwd();
  const projectDirectoryPath = path.resolve(projectDirectoryParentPath, directoryName);

  log();
  log(
    `Creating new Node boilerplate in ${chalk.bold.green(projectDirectoryPath)}` // with database as ${chalk.bold.green(databaseName)}.`
  );
  log();

  try {
    await makeDirectory(projectDirectoryPath);

    log(`Created directory ${chalk.greenBright(directoryName)}`);
    log();

    await copyTemplate(templateFolderPath, projectDirectoryPath, directoryName);

    // await ensureNpmrc(projectDirectoryPath, directoryName);
    await updatePackageJSON(projectDirectoryPath, directoryName);

    try {
      await initializeGit(projectDirectoryPath);
      // Ensure .gitignore only when git is successfully initialized
      await ensureGitIgnore(projectDirectoryPath, directoryName).catch(noop);
    } catch (exception) {
      log(
        chalk.yellow(
          `Could not initialize ${directoryName} as a git repository due to the following exception.`
        )
      );
      log(chalk.yellow(exception.message));
    }

    await installDependencies(projectDirectoryPath);

    log();
    log(chalk.green(`Successfully created new Node application '${directoryName}'.`));
    log();
    log(
      `Switch to '${directoryName}' directory using\n\n${chalk.blue(
        `cd ${directoryName}`
      )}\n\nThen run the server in development mode using\n\n${chalk.blue("npm start")}\n\n`
    );
  } catch (e) {
    // log(e.message);
    log();
    console.error(e.message);
    log();
    log(`Removing directory ${directoryName}...`);
    log();
    await remove(projectDirectoryPath);
    log("Directory removed.");
    // process.exit(0);
  }
};
