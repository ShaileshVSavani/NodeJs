const Order = require("../models/order.model");

// Create a new order
exports.create = async (req, res) => {
  try {
    const user = req.user.id; // Assuming `req.user` is populated via authentication middleware
    const { foods } = req.body;

    if (!foods || foods.length === 0) {
      return res.status(400).send({ message: "Foods array is required and cannot be empty" });
    }

    const order = await Order.create({ foods, user });
    res.status(201).send(order); // Return a 201 status for resource creation
  } catch (error) {
    res.status(500).send({ message: "Error creating order", error: error.message });
  }
};

// Get all orders
exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("foods", "title") // Populates `foods` with only the `title` field
      .populate("user", "username email"); // Optionally populate user details if needed
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving orders", error: error.message });
  }
};

// Get all orders by user
exports.getAllOrderByUser = async (req, res) => {
  try {
    const user = req.user.id; // Assuming `req.user` is populated
    const orders = await Order.find({ user }).populate("foods"); // Populates all fields of `foods`
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user's orders", error: error.message });
  }
};
