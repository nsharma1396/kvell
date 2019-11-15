#!/usr/bin/env node

require = require("esm")(module);
const { createNodeApp } = require("../src/main");

createNodeApp(process.argv.slice(2));
