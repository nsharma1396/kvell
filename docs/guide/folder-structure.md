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

### apidocs

`apidocs` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. 

For example,

```
  apidocs/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `apidocs` [**here**](apidocs.md)

### controllers
`controllers` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. 

For example,

```
  controllers/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `controllers` [**here**](routes-and-controllers.md)

### global
`global` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. 

For example,

```
  global/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `global` [**here**](global.md)

### logs
`logs` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. 

For example,

```
  logs/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `logs` [**here**](logging.md)

### models
`models` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. 

For example,

```
  models/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `models` [**here**](models.md)

### routes
`routes` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. 

For example,

```
  routes/
    home.js
```

implies that there is a route in your application with the name as '**home**'.\
More on `routes` [**here**](routes-and-controllers.md)
