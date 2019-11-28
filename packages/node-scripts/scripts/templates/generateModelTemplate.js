const routeTemplate = routeName =>
  `const ${routeName}Router = ("node-scripts-dev/lib/db").dbLib;

module.exports = ${routeName}Router;`;

module.exports = routeTemplate;
