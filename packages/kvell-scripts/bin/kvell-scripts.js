#!/usr/bin/env node
const runStartScript = require("../scripts/start/runStartScript");
const runBuildScript = require("../scripts/build-scripts/runBuildScript");
const parseApiDocs = require("../scripts/start/parseApiDocs");

// Parsing logic resembles to that in create-react-app's react-scripts
const args = process.argv.slice(2);

/*
 List of scripts that can be run:
 1. start -> To start the server
 
 // To-do:
 2. build -> To run the server in production build
*/

// scriptIndex stores the index of the first valid arg
const scriptIndex = args.findIndex(arg => arg === "start" || arg === "build");

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs =
  scriptIndex >= 0 ? args.slice(0, scriptIndex).concat(args.slice(scriptIndex + 1)) : []; // So that other arguments do not get missed

if (script === "start") {
  parseApiDocs();
  runStartScript(script, nodeArgs);
} else if (script === "build") {
  runBuildScript("build-scripts", nodeArgs);
} else if (["debug", "test"].includes(script)) {
  console.log("This option is under development.");
} else {
  console.error("Invalid command");
}
