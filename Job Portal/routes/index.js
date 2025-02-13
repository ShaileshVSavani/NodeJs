const { Router } = require("express");

const userRoutes = require("./user");
const userDetailRoutes = require("./userDetails");
const companyRoutes = require('./company');
const jobRoutes = require("./job");
const applicationRoutes = require("./application");

const index = Router();

index.use("/users", userRoutes);
index.use("/user-details", userDetailRoutes);
index.use('/companies', companyRoutes);
index.use('/jobs', jobRoutes);
index.use("/applications", applicationRoutes);

module.exports = index;