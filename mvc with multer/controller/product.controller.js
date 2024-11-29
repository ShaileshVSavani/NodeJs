const Product = require("../model/product.model");

const createProduct = async (req, res) => {
    console.log(req.file);

    if (req.file) {
      req.body.img = req.file.path;
    }
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getProducts = async (req, res) => { 
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getProductById = async (req, res) => { 
    try {
        const {id } = req.params
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => { 
    try {
        const { id } = req.params
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => { 
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };