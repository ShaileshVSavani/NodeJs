const mongoose = require("mongoose");
const User = require("./user.model"); 

const foodSchema = new mongoose.Schema({
  title: String,
  price: Number,
  img: String,
  category: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Use the model name as a string
});

const Food = mongoose.model("Food", foodSchema); 
module.exports = Food;

