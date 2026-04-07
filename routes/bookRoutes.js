const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { createBook, getBooks } = require("../controllers/bookController");

// Upload image
router.post("/", upload.single("image"), createBook);

// Get all books
router.get("/", getBooks);

module.exports = router;