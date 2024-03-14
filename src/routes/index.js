const express = require("express");

const { signup, login } = require("../controller/user-controller");
const { getProducts, getProduct } = require("../controller/product-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/get-products", getProducts);   // multiple
router.get("/product/:id", getProduct);     // single

module.exports = router;