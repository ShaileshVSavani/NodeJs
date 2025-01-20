const { Router } = require("express");
const foodRouter = require("./food");
const userRoutes = require("./user.route");
const app = Router();

app.use("/food", foodRouter);
app.use("/user", userRoutes);
module.exports = app;
