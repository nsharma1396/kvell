---
id: using-generate-scripts
title: Generation Scripts in Kvell
sidebar_label: Using generation scripts
---

You can generate Routes and Models separately using kvell's generation command.
The `generate` script is exposed as `kvell-gen` command. But, instead of using `kvell-gen` directly, you can use `npm run generate` which
wraps up `kvell-gen`.

## Setup

> Note: This will be added by default in your `package.json` if you have created your application using `create-kvell-app`.

For `npm run generate` to work, add the following in the `scripts` object of your application's `package.json`:

```json
"scripts": {
  ...
  "generate": "kvell-gen"
  ...
}
```

## Route

```typescript
routes: Array<{ name: string, path: string }>
```

For generating a route:

```sh
  npm run generate route
```

![generate route](assets/generate_route.gif)

This will launch a prompt asking you to enter two values:

- Route name (string): This will be used as the filename for your route's controller and route files, and as any reference for your route internally in kvell.\
  _The route name must be a **unique and filename compatible** string to ensure no two routes have any name conflicts._

An example route name can be "**user**".

This will generate `user.js` files in your `routes`, `controllers` and `apidocs` folders and map them accordingly in the `index.js` files.

- Route path (string): The route path is a **unique root URL** for your route. This is the same root URL path that you will provide to an express `Router`.

An example route path can be "**/user/:id**"

This will register a route with root URL as "/user/:id" with your `routes/user.js` file so that any incoming request in this URL will be directed to the appropriate method handler (get, put, post, patch or delete) in the `user.js` route file.

Internally, Kvell uses `[express.js](https://expressjs.com/)` for handling the routing in your application.
For more details on Routing, [click here](https://expressjs.com/en/guide/routing.html)

## Model

> A Model file is only useful when you have a database plugin configured. To install and configure a database plugin in Kvell, view the [Database Plugins docs](database-plugins/overview.md)

```typescript
models: Array<string>
```

For generating a model:

```sh
  npm run generate model
```

![generate route](assets/generate_model.gif)

This will launch a prompt asking you to enter a string for your model's name.

The model name will be used as the filename for your model, and as any reference for your model internally in kvell.\
_The model name must be a **unique and filename compatible** string to ensure no two models have any name conflicts._

An example model name can be "**project**".

This will generate a `project` directory in your `models` directory and also generate the following two files:

- `projectModel.js`: This file should handle your `Project` model's schema.
- `index.js`: This file should handle all querying based logic for the `Project` model. Any controller file should generally communicate with this file. This adds a thin layer between the Model's schema layer and it's query layer.
