# Kvell.js

## What is Kvell ?

[Kvell.js](https://www.github.com/nsharma1396/kvell) is a family of packages using which you can create Node.js applications with pre-defined
configurations, a fixed application flow and a set of abstractions. It bootstraps the node application with a set of popularly used npm packages and provides a minimal setup environment so that the developer can focus directly on writing the essential parts of the application.

## What does it do ?

- Maintains a proper code standard.
- Abstracts out server configurations.
- Abstracts out database related configurations.
- Maintains a consistent top-level folder structure.
- Provides support for writing and viewing API documentations without any setups.
- Provides auto-template creation for routes and models.
- Does automatic git initialization (if possible) on project setup.
- Provides a very simple and basic logging mechanism.

`Kvell` takes inspiration from [create-react-app](https://www.create-react-app.dev) in it's implementation and shares some similarity with `create-react-app's` methodology and internal flow when it comes to how it works under the hood.

# Creating an application

To setup a kvell application, you just need to run the following command

```sh
npx create-kvell-app example-app
```

![create an application](website/docs/assets/create-app.gif)


**Note**: [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher. If you use npm 5.1 or earlier, you need to install `create-kvell-app` globally instead:


```sh
npm i -g create-kvell-app
```

Once installed, you can create a kvell application by running:

```sh
create-kvell-app example-app
```

## Running the server

Now, you can change your directory to `example-app` and run the application in `development` mode by running:

```sh
cd example-app
npm start
```

That's it! This will start you server on [http://localhost:5001](http://localhost:5001).

![starting the server](website/docs/assets/start-server.gif)

## Optional Installation Method

You can also create an application using the `npm init` script.

```sh
npm init kvell-app example-app
```

For complete docs of Kvell, visit [Kvell Docs](https://kvelljs.now.sh/)
