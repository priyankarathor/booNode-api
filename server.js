require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));