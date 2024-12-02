const Product = require("../model/productSchema")

const getProduct = async (req, res) => {
    let product = await Product.find()
    res.send(product)
}

const createProduct = async (req, res) => {
    console.log (req.body)
    const product = await Product.create(req.body)
    res.send(product)
}


const deleteProduct = async (req, res) => {
    let { id } = req.params
    let product = await Product.findByIdAndDelete(id)
    res.send(product)
}

const updateProduct = async (req, res) => {
    let { id } = req.params
    let product = await Product.findByIdAndUpdate(id, req.body, {new: true})
    res.send(product)
}

const getProductById = async (req, res) => {
    let { id } = req.params
    let product = await Product.findById(id)
    res.send(product)
}


module.exports = { getProduct, updateProduct, getProductById, deleteProduct, createProduct }

