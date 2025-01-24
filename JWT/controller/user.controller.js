const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user.model");

// Create a new user
exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).send({ msg: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;

    // Create the user
    const user = await User.create(req.body);

    // Generate a JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiration (optional)
    );

    res.status(201).send({ msg: "User created successfully", user, token });
  } catch (error) {
    res.status(500).send({ msg: "Error creating user", error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ msg: "Users list retrieved", users });
  } catch (error) {
    res.status(500).send({ msg: "Failed to retrieve users", error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ msg: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiration (optional)
    );

    res.status(200).json({
      msg: "Logged in successfully",
      user: {
        email: user.email,
        id: user.id,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({ msg: "Error logging in", error: error.message });
  }
};
