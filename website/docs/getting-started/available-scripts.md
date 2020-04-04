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

## npm run build

This will run the application in the production environment by launching your kvell application [pm2](https://pm2.keymetrics.io/) process.

You can perform any of the following operations for your production server:

### Start the production server

You can launch the production server for your kvell application using the following command:

```sh
npm run build start -- --name "your-process-name"
```

> --name is a mandatory argument as it will help you to keep track of your process later.

This will start the production server as a pm2 process internally and the name for the process will be the one you pass with the `--name` argument.

### Check status of your production server

You can check the status of your production server process using the following command:

```sh
npm run build status -- --name "your-process-name"
```

> --name is a mandatory argument

This will print the current status and other details of your production server process. The value that you pass to `--name` must be the same as the one you passed while running `npm run build start`.

### Stop the production server

You can stop the production server using the following command:

```sh
npm run build stop -- --name "your-process-name"
```

> --name is a mandatory argument

This will stop the production server process. Since it uses pm2, on stopping the process, pm2 will keep the process meta-data in it's list so that the process can be restarted later. The value that you pass to `--name` must be the same as the one you passed while running `npm run build start`.

### Restart the production server

You can restart the production server using the following command:

```sh
npm run build restart -- --name "your-process-name"
```

> --name is a mandatory argument

This will stop and restart the production server process. The value that you pass to `--name` must be the same as the one you passed while running `npm run build start`.

### Delete the production server process

You can delete the production server process using the following command:

```sh
npm run build delete -- --name "your-process-name"
```

> --name is a mandatory argument

This will stop the production server process and remove it from pm2's list so that the process can be restarted later. The value that you pass to `--name` must be the same as the one you passed while running `npm run build start`.

### Flush production server logs

You can flush the production server logs using the following command:

```sh
npm run build flush -- --name "your-process-name"
```

> --name is a mandatory argument

This will flush the production server logs. The value that you pass to `--name` must be the same as the one you passed while running `npm run build start`.

### List all running pm2 processes

You can list all the running the pm2 processes using the following command:

```sh
npm run build list
```

### Register your production server to start on reboot

```sh
  npm run build startup [platform-name]
```

Registers your kvell application's production server as a process that will start on machine boot. Platform (**platform-name**) can currently be:

- ubuntu
- centos
- redhat
- gentoo
- systemd
- darwin
- amazon.
 
The current process list will be dumped and saved for resurrection on reboot.

The production server is handled completely using pm2 internally. Refer [pm2 docs](https://pm2.keymetrics.io/docs/usage/quick-start/) for more information about how pm2 works.

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
