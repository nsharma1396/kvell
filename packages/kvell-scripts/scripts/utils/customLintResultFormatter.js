const path = require("path");
const chalk = require("chalk");
const { codeFrameColumns } = require("@babel/code-frame");

const customLintResultFormatter = (results, level = "error") => {
  const errors = [];
  results.forEach(error => {
    const { filePath, messages } = error;
    const relativeFilePath = path.relative(process.cwd(), filePath);
    let fileErrorString = `${chalk.bold.cyanBright(path.resolve(".", relativeFilePath))}\n`;

    messages.forEach(message => {
      fileErrorString += `  ${chalk.bold(
        `Line ${message.line}:${message.column}`
      )}: ${chalk.whiteBright(message.message)}${
        message.ruleId !== null ? `  ${chalk.underline.whiteBright.bold(`${message.ruleId}`)}` : ""
      }`;

      if (level === "error") {
        const location = { start: { line: message.line, column: message.column } };
        const errorCodeFrame = codeFrameColumns(error.source, location, { highlightCode: true });

        fileErrorString += `\n${errorCodeFrame}\n\n`;
      } else {
        fileErrorString += "\n";
      }

      // // Generate error string from source code
      // const sourceCode = error.source.split("\n");
      // if (message.line !== null && message.endLine !== null) {
      //   fileErrorString += "\n";
      //   let lineStart = message.line >= 3 ? message.line - 2 : message.line - 1,
      //     lineEnd = message.endLine;
      //   while (lineStart <= lineEnd) {
      //     const lineNumber = lineStart + 1;
      //     const isErrorLine = lineNumber === message.line;

      //     fileErrorString += `${message.line >= 3 ? "" : "\n"}${
      //       isErrorLine ? chalk.redBright(">") : " "
      //     } ${chalk.dim(`${lineNumber} |`)} ${chalk.whiteBright(sourceCode[lineStart])}\n`;

      //     const lineNumberLengthRange = [...Array(lineNumber.toString().length)];
      //     const range = [...Array(message.column - 1).keys()];

      //     if (isErrorLine) {
      //       fileErrorString += `  ${lineNumberLengthRange.map(() => " ").join("")} ${chalk.dim(
      //         `|`
      //       )} ${range.map(() => " ").join("")}${chalk.redBright("^")}\n`;
      //     }
      //     lineStart++;
      //   }
      //   fileErrorString += "\n";
      // }
    });

    errors.push(fileErrorString);
  });
  return errors.join("\n");
};

module.exports = customLintResultFormatter;
