// const { Router } = require("express");
// const userController = require("../controller/user.controller");
// const isToken = require("../middleware/jwt-decode");
// const routes = Router();
// routes.post("/signup", userController.createUser);
// routes.post("/login", userController.login);
// routes.get("/user-list",isToken, userController.getAllUsers);
// module.exports = routes;



const { Router } = require("express");
const userController = require("../controller/user.controller");
const isToken = require("../middleware/jwt-decode");
const isAdmin = require("../middleware/authRole"); // Assuming you have an admin role check middleware

const routes = Router();

// Signup route (no token required)
routes.post("/signup", userController.createUser);

// Login route (no token required)
routes.post("/login", userController.login);

// Get all users (requires authentication and admin role)
routes.get("/user-list", isToken, isAdmin, userController.getAllUsers);

module.exports = routes;
