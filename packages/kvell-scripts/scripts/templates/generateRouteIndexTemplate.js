const routeTemplate = allRoutes => {
  let requireTemplate = "";
  let exportsTemplate = "module.exports = {\n";
  allRoutes.map((route, index) => {
    const routeName = route.name;
    requireTemplate += `const ${routeName} = require("./${routeName}");\n`;
    exportsTemplate += `  ${routeName}${index === allRoutes.length - 1 ? "" : ","}\n`;
  });
  exportsTemplate += "};";

  return `${requireTemplate}\n${exportsTemplate}`;
};

module.exports = routeTemplate;
