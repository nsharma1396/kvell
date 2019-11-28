## Server Handlers
* dbConnectionHandlers:
       Handle any operation before db is initiated, prototype:
        `function onBeforeDbInit(onDbInitSuccess, onDbInitError) => Object consisting of any options needed to pass before`
        initiating DB connection if needed

* globalMiddlewares:
        Attach global middlewares, etc before incoming requests hit any route, prototype:
        `function onBeforeRouteHandlers(appInstance) => no-return-required`

## Exported modules
* const appInstance = require("node-scripts-dev");
* const dbInstance = require("node-scripts-dev/database");