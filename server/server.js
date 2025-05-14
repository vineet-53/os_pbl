const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// app express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes
const uploadRoute = require("./routes/upload.js");
app.use("/api/upload", uploadRoute);

// listen to prot from env or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
