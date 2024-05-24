const express = require("express");
const route = express.Router();
const path = require("path");
const path404 = path.join(__dirname, "src/html/404.html");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication, authenticationV2 } = require("../../auth/authUtils");

//signup
route.post("/shop/signup", asyncHandler(accessController.signUp));
//signin
route.post("/shop/signin", asyncHandler(accessController.signIn));
//logout
route.use(authenticationV2);
////////////////////////
route.post("/shop/logout", asyncHandler(accessController.logout));
//refresh token
route.post(
  "/shop/refresh-token",
  asyncHandler(accessController.handlerRefreshToken)
);

module.exports = route;
