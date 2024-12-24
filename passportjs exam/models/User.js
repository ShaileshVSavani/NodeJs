const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String }],
  watchlist: [{ type: String }],
  bookmarks: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
