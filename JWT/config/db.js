// const mongoose = require("mongoose");
// require("dotenv").config();
// const DB_URL = process.env.DB_URL;
// const DbConnection = async () => {
//   try {
//     await mongoose.connect(DB_URL);
//     console.log("Connected to Db");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports =DbConnection

const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const DbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = DbConnection;
