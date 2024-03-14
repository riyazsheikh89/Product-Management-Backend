const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    productDescription: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
