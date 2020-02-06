---
id: kvell-db-plugin-sequelize
title: Sequelize Plugin for kvell
sidebar_label: kvell-db-plugin-sequelize
---

`Kvell-db-plugin-sequelize` wraps up [sequelize](https://sequelize.org/) and exposes all three values required to be exposed by a kvell database plugin.

## Install

```sh
npm i kvell-db-plugin-sequelize
```

You'll also have to manually install the driver for your database of choice:

```sh
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
```

## Configuration Variables

Internally, `kvell-db-plugin-sequelize` will instantiate the database object using `sequelize`'s contructor.

- [API reference for the sequelize constructor](https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)

- [Documentation for sequelize](https://sequelize.org/v5/)

## Usage

Example:

- **kvell.config.js**:

```javascript
databasePlugins: [
  {
    resolve: "kvell-db-plugin-sequelize",
    options: {
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      options: {
        dialect: "mysql",
        host: "localhost",
        logging: false,
        dialectModulePath: require.resolve("mysql2")
      }
    }
  }
];
```

- **userModel.js**:

```javascript
const sequelize = require("kvell-db-plugin-sequelize").dbInstance;
const Sequelize = require("kvell-db-plugin-sequelize").dbLib;

// Create your User model's schema here and export it.

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    unique: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = User;
```

To use it, install the package and add a `databasePlugin` object in `kvell.config.js` with the following fields:

- `resolve`: Name of the plugin, i.e, **kvell-db-plugin-sequelize**
- `options`: All the parameters that you need to pass in the sequelize constructor. The following keys are accepted:

  - `database` (string): The name of the database

  - `username` (string): The username which is used to authenticate against the database.

  - `password` (string): The password which is used to authenticate against the database. Supports SQLCipher encryption for SQLite.

  - `options` (Object): An object with options, with the following mandatory keys:

    - `dialect` (string): The dialect of the database you are connecting to. One of mysql, postgres, sqlite and mssql.

    - `dialectModulePath`<sup style="color:red">\*</sup> (string): Path to the dialect module. This field is **mandatory**. For example, if you are using `mysql2` as your dialect module, you can specify it as follows:
      ```javascript
      dialectModulePath: require.resolve("mysql2");
      ```
      You can add more keys that conform to the options object schema of sequelize's constructor api. You can read more on that [here](https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)

  The plugin exports the following:

- **dbLib**: The `sequelize` object. Check [sequelize docs](https://sequelize.org/v5/) for complete api reference.
- **dbInstance**: The instantiated `sequelize` instance

- _initHandler_: (not for use)
