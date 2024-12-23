const {Router} = require("express")
const { signupui, usercreate, login, loginui } = require("../controllers/user.controller")
const { scheck } = require("../middlewares/user.middlewares")
const router = Router()


router.get("/signup" , signupui)
router.post("/signup", scheck ,usercreate)
router.get("/login" , loginui)
router.post("/login" , login)

module.exports = router