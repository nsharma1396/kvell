#!/usr/bin/env node

require = require("esm")(module /*, options*/);
const { createNodeApp } = require("../src/main");
// const createNodeApp = require("../src/main");

createNodeApp(process.argv.slice(2));
