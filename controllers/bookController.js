const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Book image is required" });
    }

    const imageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;

    const book = await Book.create({
      bookName: req.body.bookName,
      title: req.body.title,
      summary: req.body.summary,
      imageUrl,
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: err.message });
  }
};