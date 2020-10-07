---
id: using-kvell-config-js
title: Using kvell.config.js to generate templates
sidebar_label: Using kvell.config.js
---

If you are not using the generate command, you can add a route/model in Kvell by updating the kvell.config.js too.

> Note: Any updates in the kvell.config.js will reflect only when the server is running.

## Routes

```typescript
routes: Array<{ name: string, path: string }>
```

For adding a new route, open `kvell.config.js` and append a new `Route` (or multiple) object(s) to the `routes` array like so:

```javascript
// kvell.config.js

routes: [
  {
    name: "admin",
    path: "/admin"
  }
]
```

If your server is not already running, run it with `npm start`.

You will see a prompt confirming that there are some new route(s) detected, and asking for permission to create the template files for the same. You can choose to allow Kvell to add the files or add them by yourself.

Once the required files have been added, the server will start running normally.

## Models

```typescript
models: Array<string>
```

For adding a new model, open `kvell.config.js` and append a new `Model` (or multiple) name(s) to the `models` array like so:

```javascript
// kvell.config.js

models: [
  "cart"
]
```

If your server is not already running, run it with `npm start`.

You will see a prompt confirming that there are some new model(s) detected, and asking for permission to create the template files for the same. You can choose to allow Kvell to add the files or add them by yourself.

Once the required files have been added, the server will start running normally.
