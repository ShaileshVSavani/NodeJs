// const { Router } = require("express");
// const foodController = require("../controller/food");
// const isToken = require("../middleware/jwt-decode");
// const isAdmin = require("../middleware/authRole");

// const routes = Router();
// routes.post("/create", isAdmin, foodController.create);
// routes.get("/", foodController.getAll);
// routes.get("/:foodId", foodController.getById);
// routes.get("/user/:userId", foodController.getAllByUserId);
// routes.patch("/:foodId", isAdmin, foodController.update);
// routes.delete("/:foodId", isAdmin, foodController.delete);
// module.exports = routes;




const { Router } = require("express");
const foodController = require("../controller/food.controller");
const isToken = require("../middleware/jwt-decode");
const isAdmin = require("../middleware/authRole");

const routes = Router();

// Apply isToken for routes that require authentication
routes.post("/create", isToken, isAdmin, foodController.create);  // Adding isToken before isAdmin
routes.get("/", foodController.getAll);  // No token required, public route
routes.get("/:foodId", foodController.getById);  // No token required, public route
routes.get("/user/:userId", isToken, foodController.getAllByUserId);  // User needs to be authenticated to get their foods
routes.patch("/:foodId", isToken, isAdmin, foodController.update);  // Token required, only admin can update
routes.delete("/:foodId", isToken, isAdmin, foodController.delete);  // Token required, only admin can delete

module.exports = routes;
