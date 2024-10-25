
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
    try {
        // await mongoose.connect('mongodb+srv://svsrnw23:7KtIUa0wvQvAnVn1@cluster0.43jul.mongodb.net/Products.user?retryWrites=true&w=majority&appName=Cluster0');
        await mongoose.connect(process.env.Url);
        
        console.log('Connected to MongoDB!!!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = dbConnection;


