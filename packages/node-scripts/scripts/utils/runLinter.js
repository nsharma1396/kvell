const LinterEngine = require("eslint").CLIEngine;
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
// const writeFile = require("fs").writeFile;
const lintBaseConfig = require("eslint-config-kvell-scripts");
const rulesObject = require("../config/lintExtendedRules");
const customLintResultFormatter = require("../utils/customLintResultFormatter");

const log = console.log;

const nodeScriptsPath = path.resolve(path.parse(require.main.filename).dir, "..");

const cli = new LinterEngine({
  baseConfig: lintBaseConfig,
  // {
  //   extends: ["eslint:recommended"]
  // },
  envs: ["node", "es6"],
  parserOptions: {
    ecmaVersion: 2020
  },
  useEslintrc: false,
  cwd: process.cwd(),
  // plugins: ["node"],
  resolvePluginsRelativeTo: nodeScriptsPath,
  rules: rulesObject
});

// const formatter = cli.getFormatter("codeframe");
const formatter = customLintResultFormatter;

const consoleLintErrors = errorResults => {
  const formattedResults = formatter(errorResults);
  let fileErrorString = `\n${formattedResults}`;
  // fileErrorString += "\n";
  // log();
  log(fileErrorString);
  log(chalk.bold("Please fix the errors to run the application...\n"));
  log(`Search for the ${chalk.underline.redBright(`keywords`)} to learn more about each warning.`);
};

const runLinter = () => {
  log();
  // eslint-disable-next-line
  let spinner = ora();
  spinner = spinner.start(chalk.cyanBright("Compiling your app..."));
  const lintResult = cli.executeOnFiles(".");
  const errorResults = LinterEngine.getErrorResults(lintResult.results);

  // if (errorResults.length) {
  //   const rules = [];
  //   cli.getRules().forEach(rule => {
  //     if (rule.meta.docs.recommended) {
  //       rules.push(rule.meta.docs.url);
  //     }
  //   });
  //   writeFile(
  //     "./lintResult.json",
  //     JSON.stringify(rules, null, 2),
  //     // JSON.stringify(LinterEngine.getErrorResults(lintResult.results), null, 2),
  //     () => {}
  //   );
  // }
  // log();

  if (!errorResults.length) {
    spinner = spinner.succeed(chalk.greenBright("App compiled successfully!"));
    return "success";
  } else {
    spinner = spinner.fail(
      chalk.bold.redBright(
        `Couldn't compile successfully due to the following error${
          lintResult.errorCount > 1 ? "s" : ""
        }:`
      )
    );
    consoleLintErrors(errorResults);
    log();
    spinner = spinner.fail(chalk.redBright(`Compilation Errors: ${lintResult.errorCount}`));
    // log();
    return "error";
  }
};

module.exports = runLinter;
