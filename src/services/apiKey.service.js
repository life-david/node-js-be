const apiKeyModel = require("../models/apikey.model");
const crypto = require("node:crypto");

const findById = async (key) => {
  try {
    // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
    // console.log(newKey);
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return objKey;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

module.exports = {
  findById,
};
