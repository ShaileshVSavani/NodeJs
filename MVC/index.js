const express = require("express");
const dbConnection = require("./config/db");
require("dotenv").config();

const ProductRoutes = require("./router/productRoutes");
const app = express();
app.use(express.json());

const Port = process.env.PORT || 8090




app.use("/", ProductRoutes);

app.listen(Port, () => {
  console.log(`listening on http://localhost: ${Port}`);
  dbConnection();
});