const { CREATED } = require("../core/success.res");
const accessService = require("../services/access.service");

class accessController {
    static async signUp(req, res, next) {
        new CREATED({
            message: "User created successfully",
            data: await accessService.signUp(req.body),
        }).send(res);
    }
}

module.exports = accessController;
