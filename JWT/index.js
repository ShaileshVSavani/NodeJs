const express = require("express");
const dbConnection = require("./config/db");
 const userRoutes=require("./routes/user.route")

require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});

app.use("/api/v1/users",userRoutes)




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
  dbConnection();
});



// /api/v1/users