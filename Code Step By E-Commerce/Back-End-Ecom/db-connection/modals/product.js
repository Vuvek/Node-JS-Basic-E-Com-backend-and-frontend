import '../config.js'
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  userId : String,
});

const ProductModal = mongoose.model("products", ProductSchema);

export default ProductModal;
