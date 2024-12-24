const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.render('signup', { message: 'All fields are required!' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { message: 'Email is already registered. Please use a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.render('login', { message: 'Account created successfully! You can now log in.' });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.render('signup', { message: 'Error creating account. Please try again!' });
  }
};

const login = (req, res) => {
  const message = req.query.message || null;
  res.render('login', { message });
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
};

module.exports = { signup, login, logout };
