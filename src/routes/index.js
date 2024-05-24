const express = require("express");
const routes = express.Router();
const routeAccess = require("./access");
const { apikey, permission } = require("../auth/checkAuth");

//init routes

routes.use(apikey);
routes.use(permission("0000"));
routes.use("/access", routeAccess);

//export model
module.exports = routes;
