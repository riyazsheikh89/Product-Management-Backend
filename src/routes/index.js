const express = require("express");

const { signup, login, userinfo } = require("../controller/user-controller");
const { getProducts, getProduct, updateProduct } = require("../controller/product-controller");
const { createReview, updateReviewStatus, getPendingReviews, getReviewsByAuthor, getReviewsByAdmin } = require("../controller/review-controller");

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authentication, userinfo);    // USER INFO

router.get("/get-products", authentication, getProducts);   // multiple
router.get("/product/:id", authentication, getProduct);     // single
router.patch("/product/update/:id", authentication, authorization, updateProduct);   // update a specific product

router.post("/review/create", authentication, createReview);    // creates a review product
router.patch("/review/update/:id", authentication, authorization, updateReviewStatus);
router.get("/review/pending-list", authentication, authorization, getPendingReviews);
router.get("/reviews/get-all", authentication, getReviewsByAuthor); // get all reviews of an author
router.get("/reviews/get-all-admin", authentication, authorization, getReviewsByAdmin); // get all reviews of an author

module.exports = router;