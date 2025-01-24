const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // "User" as a string
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true }], // "Food" as a string
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
