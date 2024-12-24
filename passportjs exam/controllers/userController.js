const User = require('../models/User');

const getProfile = (req, res) => {
  res.render('profile', { user: req.user });
};

const addFavorite = async (req, res) => {
  const { item } = req.body;

  if (!item) {
    return res.redirect('/user/profile?error=Favorite item cannot be empty.');
  }

  if (req.user.favorites.includes(item)) {
    return res.redirect('/user/profile?error=Item already exists in favorites.');
  }

  req.user.favorites.push(item);
  await req.user.save();
  res.redirect('/user/profile');
};

const addToWatchlist = async (req, res) => {
  const { item } = req.body;

  if (!item) {
    return res.redirect('/user/profile?error=Watchlist item cannot be empty.');
  }

  if (req.user.watchlist.includes(item)) {
    return res.redirect('/user/profile?error=Item already exists in watchlist.');
  }

  req.user.watchlist.push(item);
  await req.user.save();
  res.redirect('/user/profile');
};

const addBookmark = async (req, res) => {
  const { item } = req.body;

  if (!item) {
    return res.redirect('/user/profile?error=Bookmark item cannot be empty.');
  }

  if (req.user.bookmarks.includes(item)) {
    return res.redirect('/user/profile?error=Item already exists in bookmarks.');
  }

  req.user.bookmarks.push(item);
  await req.user.save();
  res.redirect('/user/profile');
};

module.exports = { getProfile, addFavorite, addToWatchlist, addBookmark };
