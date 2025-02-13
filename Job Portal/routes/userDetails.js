// const { Router } = require("express");
// const userDetailsController = require("../controller/userDetails");
// const routes = Router();

// routes.get("/user/:userId", userDetailsController.getUserDetailsByUserId);
// routes.post("/", userDetailsController.createUser);
// routes.patch("/:id", userDetailsController.updateUser);

// module.exports = routes;




const { Router } = require("express");
const userDetailsController = require("../controller/userDetails");
const authMiddleware = require("../middleware/decode");
const routes = Router();

// Apply authentication middleware to all routes in this router
routes.use(authMiddleware);

routes.get("/user/:userId", userDetailsController.getUserDetailsByUserId);
routes.post("/", userDetailsController.createUser);
routes.patch("/:id", userDetailsController.updateUser);

module.exports = routes;
