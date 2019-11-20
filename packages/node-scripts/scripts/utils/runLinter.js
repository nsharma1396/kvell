const LinterEngine = require("eslint").CLIEngine;
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const writeFile = require("fs").writeFile;
const rulesObject = require("../config/lintExtendedRules");

const log = console.log;

const nodeScriptsPath = path.resolve(path.parse(require.main.filename).dir, "..");

const cli = new LinterEngine({
  baseConfig: {
    extends: ["eslint:recommended"]
  },
  envs: ["node", "shared-node-browser", "es6"],
  parserOptions: {
    ecmaVersion: 2020
  },
  useEslintrc: false,
  cwd: process.cwd(),
  plugins: ["node"],
  resolvePluginsRelativeTo: nodeScriptsPath,
  rules: rulesObject
});

const consoleLintErrors = (errorResults, appSrcDirectory) => {
  const errors = [];
  errorResults.forEach(error => {
    const { filePath, messages } = error;
    const relativeFilePath = path.relative(appSrcDirectory, filePath);
    let fileErrorString = `${chalk.bold.magentaBright(`./${relativeFilePath}`)}\n`;
    const sourceCode = error.source.split("\n");

    messages.forEach(message => {
      fileErrorString += `  ${chalk.bold(
        `Line ${message.line}:${message.column}`
      )} ${chalk.whiteBright(message.message)} ${chalk.underline.yellowBright(message.ruleId)}\n`;

      if (
        message.line !== undefined &&
        message.endLine !== undefined &&
        message.line !== null &&
        message.endLine !== null
      ) {
        fileErrorString += "\n";
        let lineStart = message.line - 2,
          lineEnd = message.endLine;
        while (lineStart <= lineEnd) {
          const lineNumber = lineStart + 1;
          const isErrorLine = lineNumber === message.line;
          fileErrorString += `${
            isErrorLine ? chalk.redBright(">") : " "
          } ${lineNumber}:: ${chalk.whiteBright(sourceCode[lineStart])}\n`;
          lineStart++;
        }
      }
    });
    errors.push(fileErrorString);
  });
  log();
  log(errors.join("\n\n"));
  log(chalk.bold("Please fix the errors to run the application...\n"));
  log(
    `Search for the ${chalk.underline.yellowBright(`keywords`)} to learn more about each warning.`
  );
};

const runLinter = appSrcDirectory => {
  log();
  let spinner = ora();
  spinner = spinner.start(chalk.cyanBright("Compiling your app..."));
  const lintResult = cli.executeOnFiles(".");
  const errorResults = LinterEngine.getErrorResults(lintResult.results);

  // if (errorResults.length) {
  //   writeFile(
  //     "./lintResult.json",
  //     JSON.stringify(LinterEngine.getErrorResults(lintResult.results), null, 2),
  //     err => {}
  //   );
  // }
  log();

  if (!errorResults.length) {
    spinner = spinner.succeed(chalk.greenBright("App compiled successfully!"));
    return "success";
  } else {
    spinner = spinner.fail(chalk.bold.redBright(`Compilation Errors: ${errorResults.length}`));
    consoleLintErrors(errorResults, appSrcDirectory);
    return "error";
  }
};

module.exports = runLinter;
