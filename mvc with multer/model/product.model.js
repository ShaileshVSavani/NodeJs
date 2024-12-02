
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  img: String,
  price: Number,
 
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;



// ratings: [{}],