const { Router } = require("express");
const userController = require("../controller/user");
const Ability = require("../middleware/Ability");
const authMiddleware = require("../middleware/decode");

const routes = Router();

// Public routes (no auth required)
routes.post("/signup", userController.signupUser);
routes.post("/login", userController.loginUser);
routes.get("/verify/:token/:otp", userController.verifyEmail);

// Apply authentication middleware for all routes defined below this line
routes.use(authMiddleware);

// Protected routes (auth required)
routes.patch("/:userId", userController.updateUser);
routes.delete("/:userId", userController.deleteUser);
routes.get("/info/:userId", userController.getUserById);
routes.get("/", Ability(["ADMIN"]), userController.getUserByQuery);

module.exports = routes;
