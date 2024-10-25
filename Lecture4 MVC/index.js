const express = require("express");
const dbConnection = require("./config/db");


const userRouter = require("./router/userRoutes");
const ProductRoutes = require("./router/productRoutes");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", ProductRoutes);

app.listen(8090, () => {
  console.log("listening on http://localhost:8090");
  dbConnection();
});