const express = require("express");
const routeAccess = require("./access");
const { apikey, permission } = require("../auth/checkAuth");
const routes = express.Router();

//init routes

routes.use(apikey);
routes.use(permission("0000"));
routes.use("/api/v1", routeAccess);
routes.get("/", (req, res) => {
    res.json({ message: "Welcome to the Access API" });
});

//export model
module.exports = routes;
