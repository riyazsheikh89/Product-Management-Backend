const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    productId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
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
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    author: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    admin: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedFields: [{ type: String }]
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
