const keyTokenService = require("./keyToken.service");
const crypto = require("node:crypto");
const { createTokenPair } = require("../auth/authUtils");
const { getInfodata } = require("../utils");
const shopModel = require("../models/shop.model");
const bycrypt = require("bcryptjs");
const { BadRequestError } = require("../core/error.res");
const roleShop = {
    SHOP: "shop",
    WRITER: "writer",
    EDITOR: "editor",
    ADMIN: "admin",
};

class accessService {
    static async signUp({ name, email, password }) {
        const modelShop = await shopModel.findOne({ email }).lean();
        if (modelShop) {
            throw new BadRequestError("Email already exist");
        }

        const passwordHash = await bycrypt.hash(password, 10);

        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [roleShop.SHOP],
        });

        if (newShop) {
            // create private token, public token
            const privateKey = crypto.randomBytes(64).toString("hex");
            const publicKey = crypto.randomBytes(64).toString("hex");
            const keyStore = await keyTokenService.getKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                return {
                    message: "public key error",
                };
            }

            console.log("privateKey", privateKey);
            console.log("publicKey", publicKey);

            // create token pair
            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                publicKey,
                privateKey
            );
            return {
                data: {
                    shop: getInfodata({
                        fileds: ["_id", "name", "email"],
                        data: newShop,
                    }),
                    tokens,
                },
            };
        }
        return {
            message: "Create shop fail",
        };
    }
}

module.exports = accessService;
