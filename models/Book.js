const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;