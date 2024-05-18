const keyTokenModel = require('../models/keytoken.model');

class keyTokenService{
    static async getKeyToken({userId, publicKey, privateKey}){
        try {
           const keyToken = await keyTokenModel.create({
                user: userId, 
                publicKey,
                privateKey
            });
        return keyToken ? "Create key token success" : "Create key token fail";
        } catch (error) {
            return error;
        }
    }
}

module.exports = keyTokenService;