const keyTokenModel = require("../models/keytoken.model");
const { Types } = require("mongoose");
class keyTokenService {
  static async getKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
      // const keyToken = await keyTokenModel.create({
      //     user: userId,
      //     publicKey,
      //     privateKey,
      // });
      // return keyToken
      //     ? "Create key token success"
      //     : "Create key token fail";
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };
      const token = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return token ? token.publicKey : null;
    } catch (error) {
      return error;
    }
  }
  static async findByUserId(userId) {
    return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) });
  }
  static async removeKeyById(id) {
    const result = await keyTokenModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
    return result;
  }

  static async findByRefreshTokenUser(refreshToken) {
    return await keyTokenModel
      .findOne({
        refreshTokensUsed: refreshToken,
      })
      .lean();
  }
  static async findByRefreshToken(refreshToken) {
    return await keyTokenModel.findOne({
      refreshToken,
    });
  }
  static async deleteKeyById(userId) {
    return keyTokenModel.findOneAndDelete({ user: userId });
  }
}

module.exports = keyTokenService;
