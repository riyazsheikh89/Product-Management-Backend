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

const getReviewsByAuthor = async (req, res) => {
    try {
        const reviews = await Review.find({author: req.user._id});
        return res.status(200).json({
            success: true,
            message: "Successfuly fetched all reviews of an author",
            data: reviews,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch all reviews of an author",
            data: {},
            err: error
        });
    }
}

const getReviewsByAdmin = async (req, res) => {
    try {
        const reviews = await Review.find({admin: req.user._id});
        return res.status(200).json({
            success: true,
            message: "Successfuly fetched all reviews of an author",
            data: reviews,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch all reviews of an author",
            data: {},
            err: error
        });
    }
}

module.exports = {
    createReview,
    updateReviewStatus,
    getPendingReviews,
    getReviewsByAuthor,
    getReviewsByAdmin
}