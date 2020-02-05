---
id: overview
title: Overview
---

Kvell abstracts out database configurations via database plugins.Any database plugin exposes the following three items:

- `dbLib`: The default export from the library.
- `dbInstance`: An instantiated instance of the database library.
- `initHandler`: A handler to handle any initialization/sync based operations (like `sync` in sequelize). You don't need to use the `initHandler` as it will be used internally just before the server is started.

## Where to specify the plugin details ?

All the configurations to be passed for the database instantiation of the required database are passed via the `databasePlugins` field in `kvell.config.js` file.

To add a database-plugin, you need to add a `databasePluginObject` in the `databasePlugins` array.

Each `databasePluginObject` must consists of the following fields:

- `resolve`: Name of the plugin
- `options`: Any options that are required to be passed for instantiating the plugin.

More fields may be added depending on the plugin's requirements.