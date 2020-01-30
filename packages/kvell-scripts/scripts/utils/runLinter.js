const LinterEngine = require("eslint").CLIEngine;
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
// const writeFile = require("fs").writeFile;
const lintBaseConfig = require("eslint-config-kvell-scripts");
const rulesObject = require("../config/lintExtendedRules");
const customLintResultFormatter = require("./customLintResultFormatter");

const log = console.log;

const kvellScriptsPath = path.resolve(path.parse(require.main.filename).dir, "..");

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
  cache: true,
  cacheLocation: path.join(__dirname, "..", "..", ".eslintcache"), // to create the cache file in kvell-scripts directory
  resolvePluginsRelativeTo: kvellScriptsPath,
  rules: rulesObject
});

// const formatter = cli.getFormatter("codeframe");
const formatter = customLintResultFormatter;

const getLintWarnings = results => results.filter(result => result.warningCount);

const consoleLintWarnings = errorResults => {
  const formattedResults = formatter(errorResults, "warnings");
  let fileErrorString = `\n${formattedResults}`;
  // fileErrorString += "\n";
  // log();
  log(fileErrorString);
};

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

  if (!lintResult.errorCount) {
    if (lintResult.warningCount) {
      spinner = spinner.warn(
        chalk.yellowBright(
          `App compiled with ${lintResult.warningCount} warning${
            lintResult.warningCount > 1 ? "s" : ""
          }`
        )
      );
      const warnings = getLintWarnings(lintResult.results);
      consoleLintWarnings(warnings);
      log();
    } else {
      spinner = spinner.succeed(chalk.greenBright("App compiled successfully!"));
    }
    return "success";
  } else {
    const errorResults = LinterEngine.getErrorResults(lintResult.results);

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
