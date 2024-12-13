const {Router}=require("express")
const { getIndex, getSignupPage } = require("../controllers/user.controller")

const userRouter=Router()

userRouter.get("/",getIndex)
userRouter.get("/signup",getSignupPage)

module.exports =userRouter