#!/usr/bin/env node

require = require("esm")(module);
const { makeNodeApp } = require("../src/main");

makeNodeApp(process.argv.slice(2));
