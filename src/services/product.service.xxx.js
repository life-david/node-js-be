"use strict";
const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronics } = require("../models/product.model");

// define factory
class ProductFactory {
    static productRegistry = {};
    static registerProduct(type, classRef) {
        ProductFactory.productRegistry[type] = classRef;
    }
    static async createProduct(type, data) {
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError(`not found ${type}`);
        return new productClass(data).createProduct();
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
    async createNewProduct(product_id) {
        return await product.create({ ...this, _id: product_id });
    }
}

//define
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_atributes,
            product_shop: this.product_shop,
        });
        if (!newClothing) throw new BadRequestError("Create clothing failed");

        const newProduct = await super.createNewProduct(newClothing._id);
        if (!newProduct) throw new BadRequestError("Create new product error");

        return newProduct;
    }
}

ProductFactory.registerProduct("Clothing", Clothing);

module.exports = ProductFactory;
