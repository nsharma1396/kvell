---
id: models
title: Models
---

Models in an MVC pattern contains only the pure application data, it contains no logic describing how to present the data to a user.
It only handles the structure of the data and how can it be queried.

### Example
```javascript

const sequelize = require("kvell-db-plugin-sequelize").dbInstance;
const Sequelize = require("kvell-db-plugin-sequelize").dbLib;

// Create your User model's schema here and export it.

const User = sequelize.define(
  "user",
  {
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
    },
  }
);

module.exports = User;

```

### Folder and naming convention

Models has a separate folder in a Kvell Application and each model follows the following structure and naming convention:

```text
  ...
  models/
    ...
    user/
      userModel.js
      index.js
    [modelName]/
      [modelName]Model.js
      index.js
    ...
    index.js
  ...
```

This implies that each model's folder is named as it's corresponding `modelName` which comes from `kvell.config.js`.

Every model folder is divided into two files:

- `[modelName]Model.js` : This file should deal with the Model's schema. There should be no querying logic here and accessing it in controllers should generally be avoided.
- `index.js` : The `index.js` file inside a model folder exports all the querying operations that are available for the model. The controllers in your application can import these querying functions in their code to perform various operations on the data.

The outer `index.js` is essentially a mapper for all the models and is used internally by kvell to manage model based templating, etc.
