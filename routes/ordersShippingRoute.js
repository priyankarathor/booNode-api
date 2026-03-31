const express = require("express");
const router = express.Router();
const { fetchOrderAddress } = require("../controllers/orderShippingController");

// Use POST instead of GET
router.post("/address", fetchOrderAddress);

module.exports = router;