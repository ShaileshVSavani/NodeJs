const User = require("../models/user.model");


const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let isExists = await User.findOne({ email: email });

    // Check if the user already exists
    if (isExists) {
      return res.status(400).send("User already exists");
    }

    // Create new user
    let user = new User({
      username: username,
      email: email,
      password: password,
    });

    // await user.save(); // Save user to DB
    await User.create(user);

    return res.status(201).json(user); // Return the created user as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserById = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findById(userId);
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndDelete(userId);
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let isExists = await User.findOne({ email: email });
  if (!isExists) {
    return res.send("user not found");
  }
  if (isExists.password != password) {
    return res.send("invalid password");
  }

  res.cookie("username", isExists.username);
  res.cookie("userId", isExists.id);
  return res.send("logged in");
};

// pages
const getLoginPage = (req, res) => {
  res.render("login", {
    title: "login page",
  });
};
const getSignupPage = (req, res) => {
  res.render("signup");
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  getLoginPage,
  getSignupPage,
  login,
};
