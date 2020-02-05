---
id: kvell-config-js
title: kvell.config.js
---

This is the main configuration file for a Kvell application.

It contains all the configurations that a kvell application needs to run successfully. The configurations are:

- routes
- models
- protocol
- autoRequireRoutes

## `routes`

> Note: Instead of editing `routes` manually, you can try using the `generate` command provided by Kvell. You can read more about the `generate` command [**here**](auto-templating/using-generate-scripts.md)

```typescript
routes: Array<{ name: string, path: string }>
```

**Default: [ ]**

The routes array contains a list of all the routes that will be used in the application.

Each route in the array is defined by an object consisting of the following keys:

- **name**: A **unique and filename compatible** name of the route. It must be unique to avoid any conflicts due to two or more routes having the same names. The name of the route will be used as the filename for this route.
  Files with this name will be created in the following folders:

  - apidocs
  - controllers
  - routes

- **path**: A **unique root url** for your route. This is the same root URL path that you will provide to an express `Router`.

Example:

```javascript
// kvell.config.js
module.exports = {
  ...
  routes: [
    {
      name: "home",
      path: "/home"
    },
    {
      name: "post",
      path: "/post/:id"
    }
  ]
  ...
}
```

The folder structure for this `routes` configuration will look like the following:

```
  apidocs/
    home.js
    post.js
  controllers/
    home.js
    post.js
    index.js
  routes/
    home.js
    post.js
    index.js
```

Note: Kvell will always check (when it is running the server) if the the application's controllers and routes consist of files corresponding to all the specified routes in the config object. It will check that using the `name` key in each route object. If it will be unable to find a corresponding file, it will ask the user's permission to generate the file automatically.

## `models`

> Note: Instead of editing `models` manually, you can try using the `generate` command provided by Kvell. You can read more about the `generate` command [**here**](auto-templating/using-generate-scripts.md)

> **A Model file is only useful when you have a database plugin configured. To install and configure a database plugin in Kvell, view the [Database Plugins docs](database-plugins/overview.md). <span style="color: red">\*\*</span>**

```typescript
models: Array<string>
```

**Default: [ ]**

The models array contains a list of all the models that will be used in the application.

Each model in the array is defined by the model's name.

Convention:
The model name should be **_unique and filename compatible_** name of the route. It must be unique to avoid any conflicts due to two or more model having the same names. The name of the model will be used as the filename for this model.

Files with this name will be created in the following folders:

- models

Example:

```javascript
// kvell.config.js
module.exports = {
  ...
  models: ["user"]
  ...
}
```

The folder structure for this `models` configuration will look like the following:

```
  models/
    user/
      index.js
      userModel.js
```

Note: Kvell will always check (when it is running the server) if the the application's models consist of files corresponding to all the specified models in the config object. It will check that using the name of the model provided in the `models` array.. If it will be unable to find a corresponding file, it will ask the user's permission to generate the file automatically.

## `protocol`

```typescript
protocol: "http" | "https";
```

**Default: "http"**

The protocol key is used to get the configuration of whether the developer wants to run a `http` server or a `https` server.

> Note: Only `http` is supported currently, while `https` support will be available soon.

Example:

```javascript
// kvell.config.js
module.exports = {
  ...
  protocol: "http"
  ...
}
```

## databasePlugins

> To-do: Update with more details

```typescript
databasePlugins: Array<object>
```

Database plugins can be configured in kvell.config.js as an object with the following fields:

```typescript
databasePlugins: [
  {
    resolve: string,
    options: object
  }
];
```

For example,

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
        logging: false
      },
      dialectModulePath: require.resolve("mysql2")
    }
  }
];
```

## `autoRequireRoutes`

```typescript
autoRequireRoutes: Boolean;
```

**Default: true**

Kvell will by default automatically register all the routes provided in the routes config object with the root url as the `path` variable given in each Route object. But often there is a need to have `middlewares` before some selected routes (like an `authentication` middleware).

For example,

Let's say that you need an authentication middleware to your application which checks if a user is authenticated and does the following,

- If the user is not authenticated, the request will not be allowed to go through.
- If the user is authenticated, the request goes through to the next middleware or the corresponding router.

We will assume that this middleware is already implemented and being exported from a file named `middleware` in your `utils` directory. So we can add this middleware in the `globalMiddlewares` function in the following way,

```javascript
// `global/globalMiddlewares.js`

const middlewares = require("../utils/middlewares");

/**
 * `globalMiddlewares` handles all the middlewares/functions/configurations that you need
 * to declare/use in your application globally.
 * @param {import ("kvell-scripts").KvellAppObject} app
 * @param {import ("kvell-scripts").KvellServerObject} server
 */
const globalMiddlewares = (app, server) => {
  app.use(middlewares.auth); // middleware to validate authenticated users
};

module.exports = globalMiddlewares;
```

As `globalMiddlewares` are registered before the `routes` in Kvell, this should work fine but we will face a problem here. The problem is that this will validate for every requests on every route. So, if we have a `\login` route in which the user is trying to login and thus is not authenticated yet, the request will never go through to hit the `loginRoute`!

For these cases, we can switch `autoRequireRoutes` to `false` and register the routes yourselves in the `globalMiddlewares.js` file found in the `global` folder, like so,

```javascript
// kvell.config.js

module.exports = {
  ...
  autoRequireRoutes: false
  ...
}
```

```javascript
// `global/globalMiddlewares.js`

const middlewares = require("../utils/middlewares");
const routes = require("../routes");

/**
 * `globalMiddlewares` handles all the middlewares/functions/configurations that you need
 * to declare/use in your application globally.
 * @param {import ("kvell-scripts").KvellAppObject} app
 * @param {import ("kvell-scripts").KvellServerObject} server
 */
const globalMiddlewares = (app, server) => {
  app.use("/login", routes.login);
  app.use("/register", routes.register);
  app.use("/anyUnprotectedRoute", routes["anyUnprotectedRoute"]);

  app.use(middlewares.auth); // middleware to validate authenticated users

  app.use("/user", routes.user);
  app.use("/project", routes.project);
  app.use("/anyProtectedRoute", routes["anyProtectedRoute"]);
};

module.exports = globalMiddlewares;
```

## Example Configuration Object

```javascript
module.exports = {
  protocol: "http",
  routes: [
    {
      name: "admin",
      path: "/admin"
    },
    {
      name: "shop",
      path: "/"
    }
  ],
  models: ["product", "user", "cart", "cartItem"],
  databasePlugins: [
    {
      resolve: "kvell-db-plugin-sequelize",
      options: {
        databaseName: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        options: {
          dialect: "mysql",
          host: "localhost",
          logging: false
        },
        dialectModulePath: require.resolve("mysql2")
      }
    }
  ]
  autoRequireRoutes: true
};
```
