const keyTokenService = require("./keyToken.service");
const crypto = require("node:crypto");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { findByEmail } = require("../services/shop.service");
const { getInfodata } = require("../utils");
const brcypt = require("bcryptjs");
const shopModel = require("../models/shop.model");
const roleShop = {
  SHOP: "shop",
  WRITER: "writer",
  EDITOR: "editor",
  ADMIN: "admin",
};

class accessService {
  /*
    check this token is valid
     */
  static async handlerRefreshToken(refreshToken) {
    console.log("refreshToken", refreshToken);
    const foundToken = await keyTokenService.findByRefreshTokenUser(
      refreshToken
    );
    // check xem token co su dung chua
    if (foundToken) {
      //decode token
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      console.log(userId, email);
      await keyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Error: Token is invalid 1");
    }
    //no
    const holderToken = await keyTokenService.findByRefreshToken(refreshToken);
    console.log("holderToken", holderToken);

    if (!holderToken) {
      throw new AuthFailureError("Error: Token is invalid 2");
    }

    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey
    );

    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new AuthFailureError("Error: Email not found");
    }

    // create new token pair
    const tokens = await createTokenPair(
      { userId, email },
      holderToken.publicKey,
      holderToken.privateKey
    );

    // update new token pair
    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });
    return {
      user: { userId, email },
      tokens,
    };
  }
  static async handlerRefreshTokenV2({ refreshToken, user, keyStore }) {
    const { userId, email } = user;

    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await keyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Error: Token is invalid 1");
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("Error: Token is invalid 2");
    }

    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new AuthFailureError("Error: Email not found");
    }

    // create new token pair
    const tokens = await createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    // update new token pair
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });
    return {
      user: { userId, email },
      tokens,
    };
  }

  static async logOut(keyStore) {
    const del = await keyTokenService.removeKeyById(keyStore._id);
    return del;
  }

  static async signIn({ email, password, refreshToken = null }) {
    //1. check email
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError("Error: Email not found");
    }

    //2. check password
    const match = await brcypt.compare(password, foundShop.password);
    if (!match) {
      throw new AuthFailureError("Error: Authentication error");
    }

    //3. create public key, private key
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    //4. create key token
    const { _id: userId } = foundShop;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );
    await keyTokenService.getKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId,
    });

    //5. return shop info and token pair
    return {
      shop: getInfodata({
        fileds: ["_id", "name", "email"],
        data: foundShop,
      }),
      tokens,
    };
  }

  static async signUp({ name, email, password }) {
    const modelShop = await shopModel.findOne({ email }).lean();

    if (modelShop) {
      throw new BadRequestError("Error: Email already exists");
    }

    const passwordHash = await brcypt.hash(password, 10);

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
        throw new BadRequestError("Error: Create key token fail");
      }

      // console.log("privateKey", privateKey);
      // console.log("publicKey", publicKey);

      // create token pair
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );

      return {
        shop: getInfodata({
          fileds: ["_id", "name", "email"],
          data: newShop,
        }),
        tokens,
      };
    }
    return {
      message: "Create shop fail",
    };
  }
}

module.exports = accessService;
