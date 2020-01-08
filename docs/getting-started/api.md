---
id: api
title: API
---

Kvell exposes a set of API that wrap up all the internal packages used:

- Router
- json
- static
- urlencoded
- devLog
- config

## `router`

```javascript
// routes/home.js

const homeRouter = require("kvell-scripts").router();

// invoked for any requests passed to this router
homeRouter.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any `get` request that ends in /events
// depends on where the router is "use()'d"
homeRouter.get("/events", function(req, res, next) {
  // ..
});
```

router is the same `Router` function which is exported from `Express.js`.

For more details on `router`, [click here](http://expressjs.com/en/4x/api.html#express.router)

If you have set `autoRequireRoutes` to **true**, you do not need to "use" the router anywhere in the application. The route will be automatically registered from the `routes` key from the config. So, if you have a route object like the
following in your `kvell.config.js`:

```js
module.exports = {
  ...
  routes: [
    ...
    {
      name: "home",
      path: "/home"
    },
    ...
  ],
  ...
}
```

Then, kvell will internally register the homeRouter from "routes/home" to the path "/home" so that any request that comes to "/home" will be handled by the homeRouter.

If, `autoRequireRoutes` is set to false, then you need to attach these routes to the `app` object in `global/globalMiddlewares.js`:

```js
const routes = require("../routes");

const globalMiddlewares = (app, server) => {
  app.use("/home", routes.home);
};
```

## `json`

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html).

For more details on `json`, [click here](http://expressjs.com/en/4x/api.html#express.json)

## `static`

This is a built-in middleware function in Express. It serves static files and is based on [serve-static](http://expressjs.com/en/resources/middleware/serve-static.html).

For more details on `static`, [click here](http://expressjs.com/en/4x/api.html#express.static)

## `urlencoded`

This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html).

For more details on `urlencoded`, [click here](http://expressjs.com/en/4x/api.html#express.urlencoded)

## `devLog` <span style="color:red">\*</span>

> NOTE: This may change in the next versions.

```javascript
const logger = require("kvell-scripts").devLog;

homeRouter.get("/", (req, res, next) => {
  logger.warn("This is a warning");
})
```

The purpose of `devLog` is to give you a simple mechanism wherein you can log any critical issue/process of your application in a `appLog.log` file.

The implementation will probably change for the logger and will try to provide a very robust mechanism for logging in your applications.

Internally, Kvell uses [simple-node-logger](https://www.npmjs.com/package/simple-node-logger) and exports it's logging function as `devLog`. Check the package for more details on how you can use devLog.

## `config`

```javascript
const config = require("kvell-scripts/config");
```

`config` is an object containing all the environment variables that you have added in your application. Internally, it parses these environment variables from the `.env` file using [dotenv](https://www.npmjs.com/package/dotenv).

Note: The environment variables are parsed at the very beginning of whenever the server starts running to make sure the environment variables is available to every file.