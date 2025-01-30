const  mongoose  = require("mongoose")
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL 
const connectDB = async () => {
   try {
     await mongoose.connect(MONGODB_URL);
     console.log('MongoDB connected...');
   } catch (error) {
       console.error(`Error connecting to MongoDB: ${error.message}`);
     process.exit(1);
   }
}

module.exports = connectDB;