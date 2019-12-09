const routeTemplate = routeName =>
  `const ${routeName}Router = require("@tek/node-scripts-dev").router();
// eslint-disable-next-line no-unused-vars
const ${routeName}Controller = require("../controllers").${routeName};

${routeName}Router.get("/", (request, response) => {
  // get method
});

${routeName}Router.post("/", (request, response) => {
  // post method
});

${routeName}Router.put("/", (request, response) => {
  // put method
});

${routeName}Router.delete("/", (request, response) => {
  // delete method
});

module.exports = ${routeName}Router;`;

module.exports = routeTemplate;
