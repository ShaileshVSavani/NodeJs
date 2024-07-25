const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    // number: Number
})
const User = mongoose.model('User', userSchema);
module.exports = User;