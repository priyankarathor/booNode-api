const express = require("express");
const router = express.Router();
const { fetchListing } = require("../controllers/inventoryController");

// Example route: GET /api/inventory/A1U887FZM7557Z
router.get("/:sku", fetchListing);

module.exports = router;