const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const accessService = require("../services/access.service");

class accessController {
  static async handlerRefreshToken(req, res, next) {
    // new SuccessResponse({
    //   message: "Token refreshed successfully",
    //   data: await accessService.handlerRefreshToken(req.body.refreshToken),
    // }).send(res);
    new SuccessResponse({
      message: "Token refreshed successfully",
      data: await accessService.handlerRefreshTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  }

  static async signIn(req, res, next) {
    new SuccessResponse({
      message: "User signed in successfully",
      data: await accessService.signIn(req.body),
    }).send(res);
  }
  static async signUp(req, res, next) {
    new CREATED({
      message: "User created successfully",
      data: await accessService.signUp(req.body),
    }).send(res);
  }
  static async logout(req, res, next) {
    new OK({
      message: "User logged out successfully",
      data: await accessService.logOut(req.keyStore),
    }).send(res);
  }
}

module.exports = accessController;
