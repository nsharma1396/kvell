#!/usr/bin/env node

"use strict";
const generateModel = require("../scripts/generate/generateModel");
const generateRoute = require("../scripts/generate/generateRoute");

const args = process.argv.slice(2);
// scriptIndex stores the index of the first valid arg
const genScripts = ["model", "route"];
const scriptIndex = args.findIndex(arg => genScripts.indexOf(arg) !== -1);

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
// const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []; // So that other arguments do not get missed

if (script === "model") {
  generateModel();
} else if (script === "route") {
  generateRoute();
} else {
  console.error("Invalid command");
}
