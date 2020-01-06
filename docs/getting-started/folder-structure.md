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

Please read [kvell.config.js](kvell-config-js.md) before going through the rest of the folder structure.

### apidocs

`apidocs` contains all the documentation files for the application. Each file here should generally correspond to a `route` name. For example,

```
  apidocs/
    home.js
```

implies that there is a route in your application with the name as 'home'.

### controllers
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### global
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### logs
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### models
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### routes
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.