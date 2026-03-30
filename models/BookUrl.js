// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    image: {
      type: String, // this will store the URL
      required: [true, "Book image is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;