const express = require("express");
const cors = require("cors");
const translationRoutes = require("./routes/bookRoutes"); // FIX NAME

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

app.use("/api/books", translationRoutes);

module.exports = app;