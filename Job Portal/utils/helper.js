const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

// Function to generate JWT token
const generateToken = async (data) => { 
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Error generating JWT token: ' + error.message);
    }
}

// hash password                   
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password: ' + error.message);
    }
}

// compare hashed password with input password
const comparePassword = async (hashedPassword, password) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords: ' + error.message);
    }
}

module.exports = {generateToken, hashPassword, comparePassword}