const { Router } = require("express");

const userRoutes = require("./user");
const userDetailRoutes = require("./userDetails");
const companyRoutes = require('./company');
const jobRoutes = require("./job");

const index = Router();

index.use("/users", userRoutes);
index.use("/user-details", userDetailRoutes);
index.use('/companies', companyRoutes);
index.use('/jobs', jobRoutes);

module.exports = index;