const { Router } = require("express");

const { getUser, postUser, Login } = require("../controller/user.controller");

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/", postUser);
userRouter.post("/login",Login)

module.exports = userRouter;

