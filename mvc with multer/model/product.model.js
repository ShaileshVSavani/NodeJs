// const mongoose = require("mongoose");

const { default: mongoose } = require("mongoose");

// const mogoose = require('mogoose');
const ProductSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
})
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;




// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   title: String,
//   img: String,
//   price: Number,
//   ratings: [{}],
// });

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;