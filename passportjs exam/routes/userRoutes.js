const express = require('express');
const {
  getProfile,
  addFavorite,
  addToWatchlist,
  addBookmark,
} = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Profile route
router.get('/profile', ensureAuthenticated, getProfile);

// Routes to add items
router.post('/favorites', ensureAuthenticated, addFavorite);
router.post('/watchlist', ensureAuthenticated, addToWatchlist);
router.post('/bookmarks', ensureAuthenticated, addBookmark);

// Routes to view lists
router.get('/favorites', ensureAuthenticated, async (req, res) => {
  res.render('list', { items: req.user.favorites, type: 'Favorites' });
});

router.get('/watchlist', ensureAuthenticated, async (req, res) => {
  res.render('list', { items: req.user.watchlist, type: 'Watchlist' });
});

router.get('/bookmarks', ensureAuthenticated, async (req, res) => {
  res.render('list', { items: req.user.bookmarks, type: 'Bookmarks' });
});

module.exports = router;
