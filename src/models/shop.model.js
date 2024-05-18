const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "shop";
const COLLECTION_NAME = "shops";

const shopSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        verifi: {
            type: Schema.Types.Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//export model
module.exports = model(DOCUMENT_NAME, shopSchema);
