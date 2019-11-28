const routeTemplate = routeName =>
  `const ${routeName}Router = require("node-scripts-dev").router();
  // eslint-disable-next-line no-unused-vars
  const ${routeName}Controller = require("../controllers").${routeName};

${routeName}Router.get("/", (_request, _response) => {
  // get method
});

${routeName}Router.post("/", (_request, _response) => {
  // post method
});

${routeName}Router.put("/", (_request, _response) => {
  // put method
});

${routeName}Router.delete("/", (_request, _response) => {
  // delete method
});

module.exports = ${routeName}Router;`;

module.exports = routeTemplate;
