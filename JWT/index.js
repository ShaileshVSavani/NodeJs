const express = require("express");
const DbConnection = require("./config/db");
const userRoutes = require("./routes/user.route");

const apiRoutes = require("./routes/index");
const cors = require("cors");
const isToken = require("./middleware/jwt-decode");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the NodeJs");
});

// app.use("/api/v1/users", userRoutes);
app.use("/api/v1/", isToken, apiRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port no " + PORT);
  DbConnection();
});
