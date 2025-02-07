const { Router } = require("express");
const userRoutes = require("./user");
const userDetailRoutes = require("./details");
const companyRoutes = require('./company');


const index = Router();
index.use("/users", userRoutes);
index.use("/user-details", userDetailRoutes);
index.use('/companies', companyRoutes);
module.exports = index;