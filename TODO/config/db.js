// const mongoose = require('mongoose');

// const dbConnect = async () => {
//     await mongoose.connect("mongodb+srv://svsrnw23:svs.Task123@cluster0.pdamy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//     console.log("Connect to MongoDB");

// }

// module.exports =dbConnect


//==================



const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://svsrnw23:svs.Task123@cluster0.pdamy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
