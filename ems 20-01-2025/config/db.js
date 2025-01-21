const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.MONGO_URI;
const DbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to Db");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports =DbConnection