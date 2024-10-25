const { Router } = require("express");
const Product = require("../model/productSchema");
const { getProduct, createProduct, deleteProduct, updateProduct, getProductById, getProductsByUserId } = require("../controller/product.controller");

const ProductRoutes = Router()

ProductRoutes.get('/', getProduct)
ProductRoutes.post('/', createProduct)
ProductRoutes.delete('/:id', deleteProduct)
ProductRoutes.patch('/:id', updateProduct)
ProductRoutes.get('/:id', getProductById)
ProductRoutes.get('/user/:userId', getProductsByUserId)

module.exports = ProductRoutes;