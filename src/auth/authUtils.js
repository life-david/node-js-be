const jwt = require("jsonwebtoken");
const asyncHander = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const keyTokenService = require("../services/keyToken.service");

const HEADER = {
    API_KEY: "x-api-key",
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "athorization",
    REFRESH_TOKEN: "x-refresh-token",
};

module.exports = {
    createTokenPair: async function (payload, publicKey, privateKey) {
        try {
            // access token
            const accessToken = await jwt.sign(payload, publicKey, {
                expiresIn: "2 days",
            });

            const refreshToken = await jwt.sign(payload, privateKey, {
                expiresIn: "7 days",
            });

            jwt.verify(accessToken, publicKey, (err, decoded) => {
                if (err) {
                    console.log("err verify", err);
                } else {
                    console.log("decoded verify", decoded);
                }
            });

            return { accessToken, refreshToken };
        } catch (error) {
            return {
                message: error.message,
            };
        }
    },
    authentication: asyncHander(async function (req, res, next) {
        const userId = req.headers[HEADER.CLIENT_ID];
        if (!userId) throw new AuthFailureError("Client id is required");

        // check token
        const keyStore = await keyTokenService.findByUserId(userId); // tim kiem doc theo userId
        if (!keyStore) throw new NotFoundError("Key token not found");

        //verify token
        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) throw new AuthFailureError("Token is required");

        try {
            const decoded = await jwt.verify(accessToken, keyStore.publicKey);
            if (userId !== decoded.userId)
                throw new AuthFailureError("Invalid token");
            req.keyStore = keyStore;
            return next();
        } catch (error) {
            throw error;
        }
    }),
    authenticationV2: asyncHander(async function (req, res, next) {
        const userId = req.headers[HEADER.CLIENT_ID];
        if (!userId) throw new AuthFailureError("Client id is required");

        // check token
        const keyStore = await keyTokenService.findByUserId(userId); // tim kiem doc theo userId
        if (!keyStore) throw new NotFoundError("Key token not found");

        //verify token
        const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
        if (refreshToken) {
            try {
                const decoded = await jwt.verify(
                    refreshToken,
                    keyStore.privateKey
                );
                if (userId !== decoded.userId)
                    throw new AuthFailureError("Invalid token");
                req.keyStore = keyStore;
                req.user = decoded;
                req.refreshToken = refreshToken;
                return next();
            } catch (error) {
                throw error;
            }
        }

        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) throw new AuthFailureError("Token is required");

        try {
            const decodedUser = await jwt.verify(
                accessToken,
                keyStore.publicKey
            );
            if (userId !== decodedUser.userId)
                throw new AuthFailureError("Invalid token");
            req.keyStore = keyStore;
            req.user = decodedUser;
            return next();
        } catch (error) {
            throw error;
        }
    }),

    verifyJWT: async function (token, keySecret) {
        return await jwt.verify(token, keySecret);
    },
};
