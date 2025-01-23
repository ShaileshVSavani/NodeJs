const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    // Create a new user with the hashed password
    const user = await User.create(req.body);

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send success response with token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    // Handle any errors
    res.status(500).send(error.message);
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send success response with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // Handle any errors
    res.status(500).send(error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
