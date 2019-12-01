#!/usr/bin/env node
const runStartScript = require("../scripts/start/runStartScript");
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
const scriptIndex = args.findIndex(arg => arg === "start");

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []; // So that other arguments do not get missed (like maybe environment variables, etc)

if (["start"].includes(script)) {
  parseApiDocs();
  runStartScript(args, script, scriptIndex, nodeArgs);
} else if (["build", "debug", "test"].includes(script)) {
  console.log("This option is under development.");
} else {
  console.error("Invalid command");
}
