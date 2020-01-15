---
id: logging
title: Logging in Kvell
---

> NOTE: This may change in the next versions.

You can use the exported `devLog` function from `kvell-scripts` to log any information that you need to persist in a log file called `appLog.log`.

`appLog.log` can be found in the `logs` folder of your application.

```javascript
const logger = require("kvell-scripts").devLog;

homeRouter.get("/", (req, res, next) => {
  logger.warn("This is a warning");
});
```

The purpose of `devLog` is to give you a simple mechanism wherein you can log any critical issue/process of your application in a `appLog.log` file.

The implementation will probably change for the logger and will try to provide a very robust mechanism for logging in your applications.

Internally, Kvell uses [simple-node-logger](https://www.npmjs.com/package/simple-node-logger) and exports it's logging functions in the `devLog` object. Check the package for more details on how you can use devLog.
