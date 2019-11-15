import { resolve } from "path";
import chalk from "chalk";

const log = console.log;

export const createDirectory = (directoryName, databaseName) => {
  const currentPathURL = import.meta.url;
  const currentPathName = new URL(currentPathURL).pathname;
  const resolvedPath = resolve(
    currentPathName,
    "../../templates",
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
};
