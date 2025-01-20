const { Router } = require("express");
const userController = require("../controller/user.controller");
const routes = Router();
routes.post("/", userController.createUser);
routes.get("/user-list", userController.getAllUsers)
module.exports = routes;
