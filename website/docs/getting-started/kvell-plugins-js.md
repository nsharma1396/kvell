---
id: kvell-plugins-js
title: kvell-plugins.js
---

This file stores the any plugin based configurations in kvell. Currently kvell supports only [Database Plugins](#databaseplugins) but more kinds of plugins may be added in the future.

## `databasePlugins`

```typescript
databasePlugins: Array<object>
```

Kvell.js supports a plugin based approach for adding a database in your application. To do so, you need to add a `databasePluginsObject` in the `databasePlugins` array of your app's kvell-plugins.js.
Database plugins can be configured in kvell-plugins.js as an object with the following fields:

Each `databasePluginObject` must consists of the following fields:

- `resolve`: Name of the plugin
- `options`: Any options that are required to be passed for instantiating the plugin.

More fields may be added depending on the plugin's requirements.

```typescript
databasePlugins: [
  {
    resolve: string,
    options: object
  }
];
```

For example, to add the sequelize plugin for kvell, we can append the following object in the `databasePlugins` field of kvell-plugins.js:

```javascript
// kvell-plugins.js
module.exports = {
  databasePlugins: [
    {
      resolve: "kvell-db-plugin-sequelize",
      options: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        options: {
          dialect: "mysql",
          host: "localhost",
          logging: false,
          dialectModulePath: require.resolve("mysql2")
        }
      }
    }
  ]
};
```

Refer [Database Plugins](/docs/database-plugins/overview) for more details on this field.
