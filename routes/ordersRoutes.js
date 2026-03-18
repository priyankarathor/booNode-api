const express = require("express");
const router = express.Router();

const { fetchOrders } = require("../controllers/ordersController");

router.post("/orders", fetchOrders);

module.exports = router;