const Review = require("../models/Review");

const createReview = async (req, res) => {
    try {
        const response = await Review.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Successfuly added your review",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong with review!",
            data: {},
            err: error
        });
    }
}


module.exports = {
    createReview,
}