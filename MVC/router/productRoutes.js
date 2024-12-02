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




// const { Router } = require("express");
// const {
//   getProduct,
//   createProduct,
//   deleteProduct,
//   updateProduct,
//   getProductById,
// } = require("../controller/product.controller");

// const ProductRoutes = Router();

// // Order matters: Specific routes before general routes
// ProductRoutes.get("/:id", getProductById);
// ProductRoutes.get("/", getProduct);
// ProductRoutes.post("/", createProduct);
// ProductRoutes.delete("/:id", deleteProduct);
// ProductRoutes.patch("/:id", updateProduct);

// module.exports = ProductRoutes;
