const accessService = require('../services/access.service');

class accessController {
    static async signUp(req, res, next) {
        try {
            console.log('body', req.body);
            return res.status(200).json(await accessService.signUp(req.body));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = accessController;
