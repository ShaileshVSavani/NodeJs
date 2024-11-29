const { Router } = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const upload = require('../utils/ImageUpload');
const ProductRoute = Router();
ProductRoute.get('/', getProducts)
ProductRoute.get('/:id', getProductById)
ProductRoute.post('/', upload.single("img"), createProduct)
ProductRoute.patch('/:id', updateProduct)
ProductRoute.put('/:id', deleteProduct)

module.exports = ProductRoute;