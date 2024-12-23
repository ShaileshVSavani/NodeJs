const blog = require("../models/Blog.schema")
const user = require("../models/user.schema")
const Fuse = require("fuse.js")


const blogPage = (req, res) => {
    res.render("blog")
}
const blogcreateui = (req, res) => {
    res.render("blogform")
}
const blogcreate = async (req, res) => {
    let { id } = req.cookies
    let users = await user.findById(id)

    let { title, content, image, category } = req.body

    let data = await blog.create({ title, content, image, category, authorname: users.username })
    res.cookie("blogId", data.id).send(`blog created by ${users.username}`)
}

const blogs = async (req, res) => {
    let { category } = req.query

    let data;
    if (category) {
        data = await blog.find({ category: category })
    }
    else {
        data = await blog.find()
    }
    res.send(data)
}

const blogdelete = async (req, res) => {
    let { id } = req.params

    let data = await blog.findByIdAndDelete(id)
    res.send(data)
}

const blogupadate = async (req, res) => {
    let { id } = req.params

    let data = await blog.findByIdAndUpdate(id)
    res.send(data)
}

const blogsearch = async (req, res) => {

    let query = req.query.blogs;
    const blogs = await blog.find();

    const options = {
        keys: ["author", "category", "title"],
    };
    const fuse = new Fuse(blogs, options);
    const result = fuse.search(query);
    res.send(result)
}

const singleblog = async(req , res) =>{
    let {id} = req.params

    let singleblog = await blog.findById(id)
    res.render("singleBlogPage" , {singleblog})
}

const likeupdate = async(req ,  res) =>{
    let {id} = req.cookies
    let {bid} = req.params

    let users = await user.findById(id)

    let blogs = await blog.findById(bid)

    blogs.likedBy.push({username : users.username})
    await blogs.save()

    res.status(200).cookie("id" , users.id)
    res.status(200).cookie("role" , users.role).send(blogs)

}

const addcomment = async(req , res) =>{
    let {id} = req.cookies
    let {bid} = req.params

    let users = await user.findById(id)

    let blogs = await blog.findById(bid)

    blogs.comments.push({username : users.username , text : req.body.text})
    await blogs.save()

    res.send(blogs)
}
module.exports = { blogcreateui, blogcreate, blogs, blogPage, blogdelete, blogupadate, blogsearch , singleblog , likeupdate , addcomment}