const { Router } = require("express");
const Product = require("../model/productSchema");
const { getProduct, createProduct, deleteProduct, updateProduct, getProductById } = require("../controller/product.controller");

const ProductRoutes = Router()

ProductRoutes.get('/', getProduct)
ProductRoutes.post('/', createProduct)
ProductRoutes.delete('/:id', deleteProduct)
ProductRoutes.patch('/:id', updateProduct)
ProductRoutes.get('/:id', getProductById)


module.exports = ProductRoutes;