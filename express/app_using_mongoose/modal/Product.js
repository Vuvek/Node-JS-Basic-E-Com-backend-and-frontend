import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name : String,
    brand : String,
    price : Number,
    category : String,
})

export default mongoose.model('products',ProductSchema)
