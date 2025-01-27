const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error.message);
  }
};

module.exports = connectDB;
