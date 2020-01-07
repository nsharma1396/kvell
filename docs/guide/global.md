---
id: global
title: Global
---

The `global` folder in your application will consist of two files:

- globalMiddlewares.js
- dbSyncHandlers.js

## `globalMiddlewares.js`
**globalMiddlewares.js** exposes a function which provides you with the express `app` object and a `server` object as parameters.
Using these parameters, you can register any middlewares that you need to use globally.

For example,

```javascript

const bodyParser = require("body-parser");
const path = require("path");
const static = require("kvell-scripts").static;

const globalMiddlewares = (app, server) => {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ extended: true }));
  app.set("view engine", "ejs");
  app.set("views", "views");
  app.use(static(path.join(path.resolve(__dirname, ".."), "public")));

};

module.exports = globalMiddlewares;

```

`globalMiddlewares.js` can be considered as the entry point for the application.

The routes are not required to be registered anywhere in the application if the `autoRequireRoutes` key is set to **true** in `kvell.config.js`.\
If it is set to **false**, then you **must** register all your routes in `globalMiddlewares` using `app.use` method.

```javascript

const routes = require("../routes");

const globalMiddlewares = (app, server) => {
  app.use("/auth", routes.auth);

  app.use(someAuthenticationMiddleware);

  app.use("/home", routes.home);
}

```

## `dbSyncHandlers.js`

**dbSyncHandlers.js** exposes a function `onBeforeDbSync` which is a method which will run before your database is `synced`.
This is mainly useful if you want to setup some table relationships globally and are using a library like `sequelize` which provides a `sync` method.

You might not really need to use dbSyncHandlers generally.

Example:

```javascript

const Product = require("../models/product/productModel");
const User = require("../models/user/userModel");
const Cart = require("../models/cart/cartModel");
const CartItem = require("../models/cartItem/cartItemModel");

const onBeforeDBSync = () => {
  Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
  });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });
};

module.exports = onBeforeDBSync;

```
