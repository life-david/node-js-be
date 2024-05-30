const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "apikey";
const COLLECTION_NAME = "apikeys";

const apikeyScheme = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        permissions: {
            type: [String],
            required: true,
            enum: ["0000", "1111", "2222"],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Apikey = model(DOCUMENT_NAME, apikeyScheme);

module.exports = Apikey;
