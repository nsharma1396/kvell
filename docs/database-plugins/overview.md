---
id: overview
title: Overview
---

Kvell abstracts out database configurations via database plugins.Any database plugin exposes the following three items:

- `dbLib`: The default export from the library.
- `dbInstance`: An instantiated instance of the database library.
- `initHandler`: A handler to handle any initialization/sync based operations (like `sync` in sequelize). You don't need to use the `initHandler` as it will be used internally just before the server is started.

## Where to specify the plugin details ?

All the configurations to be passed for the database instantiation of the required database are passed via the `.env` file.

## Plugin global environment variables

Kvell needs two db-plugin global values for proper usage of a plugin,

```sh
DB_NAME=mongoose
DB_PLUGIN_NAME=kvell-db-plugin-mongoose
```

**DB_NAME** helps kvell create better `Model` templates.
**DB_PLUGIN_NAME** is the value through which kvell will load the plugin.

The rest of the values are plugin-specific and can be found in there specific pages.