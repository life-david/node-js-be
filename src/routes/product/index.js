const express = require("express");
const route = express.Router();
const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../auth/authUtils");

route.use(authenticationV2);

////////////////////////
route.post("/create", asyncHandler(productController.createProduct));

module.exports = route;
