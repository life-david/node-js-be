const keyTokenService = require('./keyToken.service');
const crypto = require('crypto');
const {createTokenPair} = require('../auth/authUtils');
const { getInfodata } = require('../utils');
const shopModel = require('../models/shop.model');
const bycrypt = require('bcryptjs');
const roleShop ={
    SHOP: 'shop',
    WRITER: 'writer',
    EDITOR: 'editor',
    ADMIN: 'admin'
}

class accessService{
    static async signUp({name, email, password}){
        try {
            const modelShop = await shopModel.findOne({email}).lean();

            if(modelShop){
                return {
                    code: '3',
                    message: 'Email already exist',
                }
            }

            const passwordHash = await bycrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [roleShop.SHOP]
            });

            if(newShop){
                // create private token, public token
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                const keyStore = await keyTokenService.getKeyToken({userId: newShop._id, publicKey, privateKey});


                if(!keyStore){
                    return {
                        code: '4',
                        message: 'public key error',
                    }
                }
                console.log('keyStore', keyStore);
                console.log('privateKey', privateKey);
                console.log('publicKey', publicKey);

                // create token pair
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey);
                return {
                    code: '0',
                    message: 'Create shop success',
                    data: {
                        shop: getInfodata({fileds: ['_id', 'name', 'email'], data: newShop}),
                        tokens
                    }
                }
            }
            return {
                code: '5',
                message: 'Create shop fail',
            }
        } catch (error) {
            console.log('error', error);    
            return{
                code: '6',
                message: error.message,
            }
        }
    }
}

module.exports = accessService;