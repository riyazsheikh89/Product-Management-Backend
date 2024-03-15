const Product = require("../models/Product");

// API: /api/v1/get-products?page=2
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const skipCount = (page - 1) * pageSize;

        const products = await Product.find()
            .skip(skipCount)
            .limit(pageSize);

        return res.status(200).json({
            success: true,
            message: "Successfuly fetched all products",
            data: products,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch all products!",
            data: {},
            err: error
        });
    }
}

// API: /api/v1/product/:id
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        
        return res.status(200).json({
            success: true,
            message: "Successfuly fetched the product",
            data: product,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch the product!",
            data: {},
            err: error
        });
    }
}

// API: /api/v1/product/update/:id
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findOneAndUpdate(
            {_id: productId}, 
            req.body,
            {new: true}
        );
        return res.status(200).json({
            success: true,
            message: "Successfuly updated the document",
            data: updatedProduct,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the document",
            data: {},
            err: error
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    updateProduct
}