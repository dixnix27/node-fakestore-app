const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image:{
    type:String
  },
  rating: {
    type: Number,
  },
});

const Product = new mongoose.model("Products", ProductSchema);

module.exports = Product;
