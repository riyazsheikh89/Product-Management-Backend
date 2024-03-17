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

const updateReviewStatus = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const data = {
            status: req.body.status,
            admin: req.user._id
        }
        console.log(reviewId, data);
        const response = await Review.findOneAndUpdate(
            {_id: reviewId},
            data,
            {new: true}
        );
        return res.status(201).json({
            success: true,
            message: "Successfuly updated your review",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update the review!",
            data: {},
            err: error
        });
    }
}

const getPendingReviews = async (req, res) => {
    try {
        const pendingReviews = await Review.find({status: "PENDING"});
        return res.status(200).json({
            success: true,
            message: "Successfuly fetched pending reviews",
            data: pendingReviews,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch pending reviews!",
            data: {},
            err: error
        })
    }
}


module.exports = {
    createReview,
    updateReviewStatus,
    getPendingReviews
}