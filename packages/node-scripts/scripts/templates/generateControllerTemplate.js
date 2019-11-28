const routeTemplate = routeName =>
  `
const ${routeName}Controller = {};
  
module.exports = ${routeName}Controller;`;

module.exports = routeTemplate;
