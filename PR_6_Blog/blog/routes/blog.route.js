const {Router} = require("express")
const { checkBlogFeild } = require("../middlewares/blog.middleware")
const { isAuth, loginCheck } = require("../middlewares/auth")
const { blogcreateui, blogcreate, blogs, blogdelete, blogupadate, blogsearch, singleblog, likeupdate, addcomment, blogPage } = require("../controllers/blog.controller")
const router2 = Router()

router2.get("/" , blogPage)
router2.get("/create" ,isAuth ,  blogcreateui)
router2.post("/create"  , checkBlogFeild ,isAuth, blogcreate)
router2.get("/blogs" , blogs)
router2.delete("/delete/:id" ,isAuth , blogdelete)
router2.patch("/edit/:id" , isAuth , blogupadate)
router2.get("/singleBlog/:id" , singleblog)
router2.patch("/like/:bid",loginCheck, likeupdate)
router2.patch("/comment/:bid" , loginCheck, addcomment)
router2.get("/search" , blogsearch)

module.exports = router2