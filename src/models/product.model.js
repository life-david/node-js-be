const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true,
            trim: true,
        },
        product_thumb: {
            type: String,
            required: true,
        },
        product_description: {
            type: String,
        },
        product_price: {
            type: Number,
            required: true,
        },
        product_quantity: {
            type: Number,
            required: true,
        },
        product_type: {
            type: String,
            required: true,
            enum: ["Electronics", "Clothing", "Furniture"],
        },
        product_shop: {
            type: Schema.Types.ObjectId,
            ref: "Shops",
        },
        product_atributes: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const clothingSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: { type: String },
        material: { type: String },
        product_shop: { type: String, require: true },
    },
    {
        collection: "clothes",
        timestamps: true,
    }
);

const electronicSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        size: {
            type: String,
        },
        material: {
            type: String,
        },
    },
    {
        collection: "electronics",
        timestamps: true,
    }
);

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model("Clothing", clothingSchema),
    electronics: model("Electronics", electronicSchema),
};
