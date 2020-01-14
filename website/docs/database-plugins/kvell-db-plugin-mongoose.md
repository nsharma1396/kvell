---
id: kvell-db-plugin-mongoose
title: Mongoose Plugin for kvell
sidebar_label: kvell-db-plugin-mongoose
---

`Kvell-db-plugin-mongoose` wraps up [mongoose](https://mongoosejs.com/) and exposes all three values required to be exposed by a kvell database plugin.

## Install

```sh
npm i kvell-db-plugin-mongoose
```

## Configuration Variables

Internally, `kvell-db-plugin-mongoose` will instantiate the database object using `mongoose.connect` method.
[Documentation for mongoose](https://mongoosejs.com/docs/index.html)

The following variables must be passed through `.env` to configure the the package:

- **MONGO_CONNECTION_STRING**

  ```text
    Type: string
    Description: The connection string for the mongoose server
  ```

> This will soon be updated to cover all possible config variables.

## Usage

To use it, just install the package and update the .env with the [global environment variables](overview.md#plugin-global-environment-variables) and the [configuration variables](#configuration-variables)

The plugin exports these three values:

- dbLib: The `mongoose` object. Check [mongoose docs](https://mongoosejs.com/docs/index.html) for complete api reference.
- dbInstance: The instantiated `mongoose` instance. In this case, both dbLib and dbInstance will be basically the same objects.

- initHandler: (not for use)

Example Usage

```sh
# .env file

DB_NAME=mongoose
DB_PLUGIN_NAME=kvell-db-plugin-mongoose

MONGO_CONNECTION_STRING=mongodb://localhost:27017/myapp
```

```javascript
// userModel.js
const mongoose = require("kvell-db-plugin-mongoose").dbInstance;

// Create your User model's schema here and export it.

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```
