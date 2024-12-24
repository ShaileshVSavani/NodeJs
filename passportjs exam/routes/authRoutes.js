const express = require('express');
const passport = require('passport');
const { signup, login, logout } = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.get('/signup', (req, res) => res.render('signup', { message: null }));
router.post('/signup', signup);

// Login Route
router.get('/login', login);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user/profile',
  failureRedirect: '/auth/login?message=Invalid email or password',
}));

// Logout Route
router.get('/logout', logout);

module.exports = router;
