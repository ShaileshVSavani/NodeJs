
const Food = require("../models/food.model");

// Create a new food item
exports.create = async (req, res) => {
  try {
    req.body.userId = req.user.id; // Assuming `req.user` is populated from authentication middleware
    const food = await Food.create(req.body);
    res.status(201).send(food); // Return a 201 status code for resource creation
  } catch (error) {
    res.status(500).send({ message: "Error creating food", error: error.message });
  }
};

// Get a food item by ID
exports.getById = async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }
    res.send(food);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving food", error: error.message });
  }
};

// Update a food item by ID
exports.update = async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findByIdAndUpdate(foodId, req.body, { new: true });
    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }
    res.send(food);
  } catch (error) {
    res.status(500).send({ message: "Error updating food", error: error.message });
  }
};

// Delete a food item by ID
exports.delete = async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findByIdAndDelete(foodId);
    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }
    res.send({ message: "Food deleted successfully", food });
  } catch (error) {
    res.status(500).send({ message: "Error deleting food", error: error.message });
  }
};

// Get all food items
exports.getAll = async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving foods", error: error.message });
  }
};

// Get all food items by user ID
exports.getAllByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const foods = await Food.find({ userId });
    res.send(foods);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user's foods", error: error.message });
  }
};
