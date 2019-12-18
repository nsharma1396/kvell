#!/usr/bin/env node

require = require("esm")(module);
const { makeNodeApp } = require("../src/main");

createNodeApp(process.argv.slice(2));
