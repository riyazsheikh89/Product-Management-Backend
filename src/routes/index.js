const express = require("express");

const { signup, login } = require("../controller/user-controller");
const { getProducts, getProduct, updateProduct } = require("../controller/product-controller");
const { createReview } = require("../controller/review-controller");

const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/get-products", authentication, getProducts);   // multiple
router.get("/product/:id", authentication, getProduct);     // single
router.patch("/product/update/:id", authentication, updateProduct);   // update a specific product

router.post("/review/create", authentication, createReview);    // creates a review product

module.exports = router;