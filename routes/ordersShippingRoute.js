// routes/ordersShippingRoute.js
const express = require("express");
const router = express.Router();
const { fetchOrderAddress } = require("../controllers/orderShippingController");

// Make sure this is a function reference, not called
router.get("/:orderId/address", fetchOrderAddress);

module.exports = router;