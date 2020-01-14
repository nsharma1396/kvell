---
id: apidocs
title: Api Documentation
---

Kvell currently uses [`apidoc.js`](https://apidocjs.com/) for providing API Documentation Mechanism in your application.

> Note: The documentation library may change to some other package (like Swagger) in later versions.

## Docs flow

Apidoc.js follows the `jsdoc` pattern and makes it easier to write documentation for each of your routes.

You can edit your application's Api Documentation in the `apidocs` folder which looks something like the following:

```text
  apidocs\
    example.js
    ...
    ...
    [routeName].js
```

The `apidocs` folder by default will consist of an `example.js` file which will have some basic examples on how to use apidoc.js. Each route should have a corresponding `apidocs` file to easily document each endpoint in that route.

Here's a simple example,

```jsdoc
/**
 * @api {get} /user/:id Get User information and Date of Registration.
 * @apiVersion 0.2.0
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname  Firstname of the User.
 * @apiSuccess {String} lastname   Lastname of the User.
 * @apiSuccess {Date}   registered Date of Registration.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
```

For in-depth guide on how to use apidoc.js, [click here](https://apidocjs.com/#getting-started).

When you start your server, Kvell will automatically parse the apidocs to a static HTML website with a predefined UI layout provided by `apidocs`.

You can view the docs page in [http://localhost:5001/docs](http://localhost:5001/docs).

_The docs mechanism has a separate folder so that it is relatively easier to plug-in any documentation library._

## Configuration in package.json

You can configure `apidoc` configurations in package.json, for example:

```json
  ...
  "apidoc": {
    "name": "Application name",
    "version": "1.0.0",
    "description": "Description for your application",
    "title": "Title",
    "header": {
      "title": "My own header title"
    },
    "footer": {
      "title": "My own footer title"
    },
    "template": {
      "withGenerator": true
    }
  }
  ...

```
