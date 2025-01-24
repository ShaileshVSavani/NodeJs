// const { Router } = require("express");

// const orderController = require("../controller/order.controller");
// const routes = Router();

// routes.post("/", orderController.create);
// routes.get("/", orderController.getAll);
// routes.get("/user-orders", orderController.getAllOrderByUser);

// module.exports = routes;


const { Router } = require("express");
const orderController = require("../controller/order.controller");

const routes = Router();

// Create a new order
routes.post("/", orderController.create);  // Authentication handled globally

// Get all orders
routes.get("/", orderController.getAll);  // Authentication handled globally

// Get orders by userId
routes.get("/user/:userId", orderController.getAllOrderByUser);  // Authentication handled globally

module.exports = routes;

