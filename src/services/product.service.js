"use strict";
const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronics } = require("../models/product.model");

// define factory
class ProductFactory {
    static async createProduct(type, data) {
        switch (type) {
            case "product":
                return await product.create(data);
            case "clothing":
                return await clothing.create(data);
            case "electronics":
                return await electronics.create(data);
            default:
                throw new Error("Type product not found");
        }
    }
}

/*  
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
 */
class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_atributes,
    }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_atributes = product_atributes;
    }

    // create product
    async create() {
        return await product.create(this);
    }
}

//define
class Clothing extends Product {
    async create() {
        const newClothing = await clothing.create(this.product_atributes);
        if (!newClothing) throw new BadRequestError("Create clothing failed");
    }
}
