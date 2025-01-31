const { Router } = require("express");
const userRoutes = require("./user");
const index = Router();
index.use("/users", userRoutes);

module.exports = index;
