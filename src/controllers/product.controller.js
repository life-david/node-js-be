const ProductService = require("../services/product.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");

class ProductController {
    static async createProduct(req, res, next) {
        new SuccessResponse({
            message: "Product created successfully",
            data: await ProductService.createProduct(
                req.body.product_type,
                req.body
            ),
        }).send(res);
    }

    static async getProduct(req, res, next) {
        new SuccessResponse({
            message: "Product fetch successfully",
            data: await ProductService.getProduct(req.params.id),
        }).send(res);
    }

    static async updateProduct(req, res, next) {
        new SuccessResponse({
            message: "Product updated successfully",
            data: await ProductService.updateProduct(req.params.id, req.body),
        }).send(res);
    }

    static async deleteProduct(req, res, next) {
        new OK({
            message: "Product deleted successfully",
            data: await ProductService.deleteProduct(req.params.id),
        }).send(res);
    }
}

module.exports = ProductController;
