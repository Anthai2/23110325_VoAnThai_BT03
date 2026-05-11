const path = require("path");

const configViewEngine = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));
  app.use(require("express").static(path.join(__dirname, "../public")));
};

module.exports = configViewEngine;
