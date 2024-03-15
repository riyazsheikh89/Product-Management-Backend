const express = require("express");

const { signup, login } = require("../controller/user-controller");
const { getProducts, getProduct, updateProduct } = require("../controller/product-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/get-products", getProducts);   // multiple
router.get("/product/:id", getProduct);     // single
router.patch("/product/update/:id", updateProduct);   // update a specific product

module.exports = router;