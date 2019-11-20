const express = require("express");
const chalk = require("chalk");
const app = express();
const log = console.log;

// let runServer = () => {}; // Initialize with a no-op function to prevent any operation if entryPoint is not defined

const PORT = process.env.PORT || 5001;

const runServer = onSuccess => {
  app.listen(PORT, () => {
    log(chalk.blue(`Server running on port:`), chalk.yellowBright(PORT));
    onSuccess();
  });
};

module.exports = runServer;
