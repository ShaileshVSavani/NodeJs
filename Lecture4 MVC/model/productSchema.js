const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    userId: String
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;