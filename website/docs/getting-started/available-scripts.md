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
npm run build start
```

This will start the production server as a pm2 process internally.

> On a successful start of the process, it will create a set of files in `logs/build-logs` directory. Developers are requested not to remove any `.pid` files from the build-logs as kvell will automatically manage the `.pid` files to keep track of the `pm2` process for that application and will also handle the removal and creation of the `.pid` files internally via pm2.

The set of files that will be created are:

- Output logs: /logs/build-logs/build_output.log
- Error logs: /logs/build-logs/build_errors.log
- Pid Logs (SHOULD NOT BE EDITED/REMOVED): 
  - /build-logs/build-[pm2_id].pid
  - /build-logs/build_pm.pid


### Check status of your production server

You can check the status of your production server process using the following command:

```sh
npm run build status
```

This will print the current status and other details of your production server process.

### Stop the production server

You can stop the production server using the following command:

```sh
npm run build stop
```

This will stop the production server process. Since it uses pm2, on stopping the process, pm2 will keep the process meta-data in it's list so that the process can be restarted later.

### Restart the production server

You can restart the production server using the following command:

```sh
npm run build restart
```

This will stop and restart the production server process.

### Delete the production server process

You can delete the production server process using the following command:

```sh
npm run build delete
```

This will stop the production server process and remove it from pm2's list so that the process can be restarted later.

### Flush production server logs

You can flush the production server logs using the following command:

```sh
npm run build flush
```

This will flush the production server logs.

### List all running pm2 processes

You can list all the running pm2 processes using the following command:

```sh
npm run build list
```

### Register your production server to start on reboot

> This api ( `npm run build startup` ) is under development and is not yet available.

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
