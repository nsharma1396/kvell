---
id: routes-and-controllers
title: Routes and Controllers
---

Routes and Controllers constitute the core logic of the application. The purpose of route files is to parse any incoming request on that route and pass the relevant parsed data to the appropriate controller. The `controller` then executes the core business logic and also communicates with the `Model` layer if needed.

## Routes

As mentioned above, the `Routes` layer handles all incoming requests and parses the request object to pass the relevant data to the controller.

### Example

```javascript
```

### Folder and naming convention

Routes has a seperate folder in a Kvell Application and each file follows the following structure and naming convention:

```
  ...
  routes/
    home.js
    auth.js
    ...
    [routeName].js
    index.js
  ...
```

This implies that each file's name is the same as it's corresponding `routeName` which comes from `kvell.config.js`.
The `index.js` is essentially a mapper for all the routes and is used internally by kvell to manage route based templating, etc.

## Controllers

The `Controller` then gets the parsed data as it's parameter and performs required operations on it. It may or may not communicate with the `Model` layer to perform the operation successfully.

### Example

```javascript
```

### Folder and naming convention

Controllers has a seperate folder in a Kvell Application and each file follows the following structure and naming convention:

```
  ...
  controllers/
    home.js
    auth.js
    ...
    [routeName].js
    index.js
  ...
```

This implies that each file's name is the same as it's corresponding `routeName` which comes from `kvell.config.js`.
The `index.js` is essentially a mapper for all the controllers and is used internally by kvell to manage controller based templating, etc.
