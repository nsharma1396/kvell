---
id: available-scripts
title: Available Scripts
---

Kvell.js has the following scripts available:

## npm start

`npm start` will run the server in development mode. Before starting the server, it will do two tasks:

1. Parses files from your `apidocs` directory to create an API documentation for your application.
2. Compiles your code using [eslint](https://eslint.org/). If your code compiles successfully, then a server will be started on [http://localhost:5001](http://localhost:5001) (If a custom port is provided, the server will start on that port). If your code fails to compile due to some errors, Kvell will console those errors with brief description.

Internally, kvell uses `nodemon` to run the server in the development mode.

![starting the server](assets/start-server.gif)

### Disable `watch mode`

The server will by default start with `watch mode` enabled, i.e, it will restart the server everytime you make a change in a file. To run the server without `watch mode`, run the server like so,

```sh
npm start -- --no-watch
```

## npm run generate

`npm run generate` can be used to generate one of the following two things in your application:

1. Routes
2. Models

The generate scripts are explained in detail [**here**](auto-templating/using-generate-scripts.md).

## npm run debug

> `npm run debug` is currently under development and currently non-functional in the application

This will run the application in a debug mode.

## npm test

> `npm test` is currently under development and currently non-functional in the application

This will run the application in a test environment.

## npm build

> `npm run build` is currently under development and currently non-functional in the application

This will run the application in the production environment.
