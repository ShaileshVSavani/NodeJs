const { Router } = require("express");
const userController = require("../controller/user");
const routes = Router();
routes.post("/signup", userController.signupUser);
routes.post("/login", userController.loginUser);
routes.patch("/:userId", userController.updateUser);
routes.delete("/:userId", userController.deleteUser);
routes.get("/info/:userId", userController.getUserById);
routes.get("/", userController.getUserByQuery)

module.exports = routes;
