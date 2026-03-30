const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // multer middleware
const { createBook, getBooks } = require("../controllers/bookController");

// Upload a single book image with field name "image"
router.post("/", upload.single("image"), createBook);

// Get all books
router.get("/", getBooks);

module.exports = router;