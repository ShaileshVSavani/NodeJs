const { Router } = require("express");
const foodController = require("../controller/food");
const isToken = require("../middleware/jwt-decode");

const routes = Router();
routes.post("/create", foodController.create);
routes.get("/", foodController.getAll);
routes.get("/:foodId", foodController.getById);
routes.get("/user/:userId", foodController.getAllByUserId);
routes.patch("/:foodId",  foodController.update);
routes.delete("/:foodId", foodController.delete);
module.exports = routes;
