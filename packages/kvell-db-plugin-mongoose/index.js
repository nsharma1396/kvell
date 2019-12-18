const mongoose = require("mongoose");
const dbInstance = require("./init");
const initHandler = require("./syncHandler");

module.exports = {
  dbLib: mongoose,
  dbInstance,
  initHandler
};
