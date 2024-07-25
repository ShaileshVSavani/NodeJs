const mongoose = require('mongoose');
const DbConnection = async() => {
    await mongoose.connect('mongodb+srv://svsrnw23:shailesh123@cluster0.d34o6y5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('Connected to MongoDB');
}

module.exports = DbConnection