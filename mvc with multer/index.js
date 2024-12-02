const express = require('express');
const ProductRoute = require('./routes/product.router');
const app = express();
require('dotenv').config()
const path = require("path");
const DB = require('./config/db,js');

const PORT = process.env.PORT || 8080 

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for parsing URL-encoded request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view/index.html"));
  });

// Middleware for serving static files from the 'public' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route for uploading a file
app.use('/products', ProductRoute)

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
    DB()
})



