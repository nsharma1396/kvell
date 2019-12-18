"use strict";
const path = require("path");
const sequelize = require("./init");

const getOnBeforeDbSync = () => {
  const pathToHandler = path.resolve(process.cwd(), "global", "dbSyncHandlers");
  try {
    const onBeforeDBSync = require(pathToHandler);
    return {
      exists: true,
      onBeforeDBSync
    };
  } catch (exception) {
    console.error(exception);
    return {
      exists: false
    };
  }
};

const initializeSequelizeDB = () => {
  const { exists, onBeforeDBSync } = getOnBeforeDbSync();

  if (exists) {
    onBeforeDBSync();
  }

  return sequelize.sync();
};

module.exports = initializeSequelizeDB;
