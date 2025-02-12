const { Router } = require("express");
const userController = require("../controller/user");
const Ability = require("../middleware/Ability");
const authMiddleware = require("../middleware/decode");


const routes = Router();

// Apply authentication middleware to all routes in this router
routes.use(authMiddleware);

routes.post("/signup", userController.signupUser);
routes.post("/login", userController.loginUser);
routes.patch("/:userId", userController.updateUser);
routes.delete("/:userId", userController.deleteUser);
routes.get("/info/:userId", userController.getUserById);
routes.get("/" , Ability(["ADMIN"]), userController.getUserByQuery)
routes.get("/verify/:token/:otp", userController.verifyEmail);
module.exports = routes;
