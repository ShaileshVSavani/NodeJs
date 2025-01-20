const { Router } = require("express");
const userController = require("../controller/user.controller");
const isToken = require("../middleware/jwt-decode");
const routes = Router();
routes.post("/signup", userController.createUser);
routes.post("/login", userController.login);
routes.get("/user-list",isToken, userController.getAllUsers);
module.exports = routes;
