const express = require("express");
const routes = express.Router();
const routeAccess = require("./access");
const routeProduct = require("./product");
const { apikey, permission } = require("../auth/checkAuth");

//init routes

routes.use(apikey);
routes.use(permission("0000"));
routes.use("/access", routeAccess);
routes.use("/product", routeProduct);

//export model
module.exports = routes;
