
const mongoose = require("mongoose");
require("dotenv").config();

 const url = process.env.Db_Url
const dbConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB!!!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = dbConnection;



