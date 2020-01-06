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

- **path**: A **unique root url** for your route. This is the same path that you will provide to an express `Router`.

Example:

```javascript
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
  ...
  models: ["user"]
  ...
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
...
protocol: "http"
...
```

## `autoRequireRoutes`

```typescript
autoRequireRoutes: Boolean;
```

**Default: true**

Kvell will by default automatically register all the routes provided in the routes config object with the root url as the `path` variable given in each Route object. But often there is a need to have `middlewares` before some selected routes (like an `authentication` middleware). For these cases, you can switch `autoRequireRoutes` to `false` and register the routes yourselves in the `globalMiddlewares.js` file found in the `global` folder.

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
  autoRequireRoutes: true
};
```