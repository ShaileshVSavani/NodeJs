const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to Database
  connectDB();
});
