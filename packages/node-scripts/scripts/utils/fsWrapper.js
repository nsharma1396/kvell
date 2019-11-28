const fs = require("fs");
const fse = require("fs-extra");
const { promisify } = require("util");

const writeToFile = promisify(fs.writeFile);
const readFromFile = promisify(fs.readFile);

module.exports = {
  readFromFile,
  writeToFile,
  // ensureDirSync: fse.ensureDirSync,
  ...fse
};
