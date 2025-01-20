const Food = require("../models/food.model");

exports.create = async (req, res) => {
  req.body.userId = req.user.id;
  let food = await Food.create(req.body);
  res.send(food);
};

exports.getById = async (req, res) => {
  const { foodId } = req.params;
  let food = await Food.findById(foodId);
  res.send(food);
};

exports.update = async (req, res) => {
  const { foodId } = req.params;
  let food = await Food.findByIdAndUpdate(foodId, req.body, { new: true });
  res.send(food);
};

exports.delete = async (req, res) => {
  const { foodId } = req.params;
  let food = await Food.findByIdAndDelete(foodId);
  res.send(food);
};
exports.getAll = async (req, res) => {
  let foods = await Food.find();
  res.send(foods);
};

exports.getAllByUserId = async (req, res) => {
  let { userId } = req.params;
  let foods = await Food.find({ userId: userId });
  res.send(foods);
};
