const mongoose = require("mongoose");
const dbConnet = async () => {
  await mongoose.connect(
    "mongodb+srv://svsrnw23:shailesh098@cluster0.sh5rr6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("MongoDB Connected...");
};

module.exports = dbConnet;
