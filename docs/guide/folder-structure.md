---
id: folder-structure
title: Folder Structure
---

## Structure
The folder structure of a `Kvell` application follows an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern and looks like the following:

    example-app/
      apidocs/
        example.js
      controllers/
        index.js
      global/
        globalMiddlewares.js
        dbSyncHandlers.js
      logs/
        appLog.log
      models/
        index.js
      routes/
        index.js
      kvell.config.js
      .env
      .gitignore

A strict file/folder naming convention is followed in the application to maintain consistency and automatic template creation.

### kvell.config.js
`kvell.config.js` is the main configuration file in a kvell application. You can manage configurations like

- Routes
- Models
- Protocol, etc.

Internally, kvell uses these configurations to abstract out certain tasks for you when running the application.

Please read [**kvell.config.js**](getting-started/kvell-config-js.md) before going through the rest of the folder structure.

### global
`global` contains two files which serve as global setup for the application.
 
The `global` folder looks like the following:
```
  global/
    globalMiddlewares.js
    dbSyncHandlers.js
```

Here,

- **globalMiddlewares.js** exposes a function which provides you with the express `app` object and a `server` object as parameters.
Using these parameters, you can register any middlewares that you need to use globally.

For example, an authentication middleware.

`globalMiddlewares.js` can be considered as the entry point for the application.

> Note: The routes are not required to be registered anywhere in the application if the `autoRequireRoutes` key is set to **true** in `kvell.config.js`. If it is set to **false**, then you **must** register all your routes in `globalMiddlewares` using `app.use` method.

- **dbSyncHandlers.js** exposes a function `onBeforeDbSync` which is a method which will run before your database is `synced`.
This is mainly useful if you want to setup some table relationshipe and are using a library like `sequelize` which provides a `sync` method.

More on `global` [**here**](global.md)

### routes
`routes` contains all the routes files for your application. Each file here should correspond to a `route` name from your kvell.config.js. 

For example,

```
  routes/
    home.js
    index.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `routes` [**here**](routes-and-controllers.md)

### controllers
`controllers` contains all the controller files for your application. Each file here should correspond to a `route` name from your kvell.config.js 

For example,

```
  controllers/
    home.js
    index.js
```

implies that there is a controller for a "**home**" route in your application.\
More on `controllers` [**here**](routes-and-controllers.md)

### models
`models` contains all the model based files for the application. Each file here should correspond to a `model` name from your kvell.config.js. 

For example,

```
  models/
    user/
      index.js
      userModel.js
    index.js
```

implies that there is a model in your application with the name as '**user**'.\
More on `models` [**here**](models.md)

### apidocs

`apidocs` contains all the documentation files for the application. Each file here should correspond to a `route` name. 

For example,

```
  apidocs/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `apidocs` [**here**](apidocs.md)


### logs
`logs` contains a file `appLog.log` which is used for logging any data you want to be logged in during the running of the application. 

For example,

```
  logs/
    appLog.log
```

More on `logs` [**here**](logging.md)
