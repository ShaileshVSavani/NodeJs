// const express = require("express");
// const DbConnection = require("./config/db");
// const userRoutes = require("./routes/user.route");

// const apiRoutes = require("./routes/index");
// const cors = require("cors");
// const isToken = require("./middleware/jwt-decode");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Welcome to the NodeJs");
// });

// // app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/", isToken, apiRoutes);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log("Server running on port no " + PORT);
//   DbConnection();
// });



const express = require("express");
const DbConnection = require("./config/db");
const userRoutes = require("./routes/user.route");
const apiRoutes = require("./routes/index"); // This will handle all routes under /api/v1
const cors = require("cors");
const isToken = require("./middleware/jwt-decode");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the NodeJs");
});

// Apply the token check globally to all /api/v1 routes
app.use("/api/v1/", isToken, apiRoutes);  // All routes under /api/v1/ require authentication

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port no " + PORT);
  DbConnection();
});
