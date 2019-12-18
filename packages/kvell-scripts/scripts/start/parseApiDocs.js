// const spawn = require("cross-spawn").sync;
const path = require("path");
const apidoc = require("apidoc");
const chalk = require("chalk");
const ora = require("ora");
const { ensureDirSync } = require("../utils/fsWrapper");
const log = console.log;

const parseApiDocs = () => {
  const spinner = ora(chalk.yellow("Parsing api docs..."));
  const projectDir = process.cwd();
  const libPath = path.dirname(path.dirname(__dirname));
  const src = path.resolve(projectDir, "apidocs");
  const dest = path.resolve(libPath, "apidocs");
  ensureDirSync(dest);
  const result = apidoc.createDoc({
    src,
    dest,
    // config: path.resolve(libPath, "config"),
    silent: true
  });

  if (!result) {
    spinner.fail(chalk.red("Something went wrong while parsing the api docs"));
    log();
  } else {
    spinner.succeed(chalk.green("Parsed api docs successfully."));
    log();
  }

  // const args = ["-i", inputDir, "-o", outputDir];
  // const result = spawn("node_modules/node-scripts-dev/node_modules/.bin/apidoc", args, {
  //   // stdio: "inherit"
  // });
  // result.output.forEach(output => {
  //   if (output) {
  //     const stringOutput = output.toString("utf-8");
  //   }
  // });
  // if (result.error) {
  //   const exception = result.error;
  //   log();
  //   log(chalk.red("Something went wrong while parsing the api docs"));
  //   log();
  //   // log(chalk.red(`Error: ${exception.message}`));
  //   log(chalk.red(exception.stack));
  //   return false;
  // } else {
  //   return true;
  // }
};

module.exports = parseApiDocs;
