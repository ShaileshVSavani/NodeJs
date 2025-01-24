// const { Router } = require("express");
// const foodRouter = require("./food.route");
// const userRoutes = require("./user.route");
// const orderRoutes = require("./order");
// const app = Router();

// app.use("/food", foodRouter);
// app.use("/user", userRoutes);
// app.use("/order", orderRoutes);
// module.exports = app;



const { Router } = require("express");
const foodRouter = require("./food.route");
const userRoutes = require("./user.route");
const orderRoutes = require("./order.route");  // Ensure correct file name for routes
const app = Router();

// Use different route modules for different resources
app.use("/food", foodRouter);  // All food-related routes will be prefixed with /food
app.use("/user", userRoutes);  // All user-related routes will be prefixed with /user
app.use("/order", orderRoutes);  // All order-related routes will be prefixed with /order

module.exports = app;

