// const fs = require("fs");
const fse = require("fs-extra");
// const { promisify } = require("util");

const writeToFile = fse.writeFile; // promisify(fs.writeFile);
const readFromFile = fse.readFile; // promisify(fs.readFile);

module.exports = {
  readFromFile,
  writeToFile,
  // ensureDirSync: fse.ensureDirSync,
  ...fse
};
