const { size } = require("lodash");
const { module, Schema } = require("mongoose");

const DOCUMENT_NAME = "product";
const COLLECTION_NAME = "products";

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
      ref: "shop",
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
  product: module.model(DOCUMENT_NAME, productSchema),
  clothing: module.model("clothings", clothingSchema),
  electronic: module.model("electronic", electronicSchema),
};
