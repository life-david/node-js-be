const express = require("express");
const route = express.Router();

const accessController = require("../../controllers/access.controller");
const { asyncHander } = require("../../auth/checkAuth");

//signup
route.post("/shop/signup", asyncHander(accessController.signUp));

//export model
module.exports = route;
