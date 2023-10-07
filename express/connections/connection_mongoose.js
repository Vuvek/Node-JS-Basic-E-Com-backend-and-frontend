import mongoose from "mongoose";

mongoose.connect('mongodb+srv://vuvek:test@cluster0.1wiww.mongodb.net/e-comm')
const ProductSchema = mongoose.Schema({
    name : String,
    brand : String,
    price : Number,
    category : String,
})

async function saveInDB() {
    const ProductModal = mongoose.model('products',ProductSchema)
    let data = new ProductModal({name : 'vivo z11 pro',brand : 'vivo',price : 10000,category : 'mobile'})
    let result = await data.save()
    console.log(result)
}

async function updateInDB() {
    const Product = mongoose.model('products',ProductSchema)
    let data = await Product.updateOne({brand : 'vivo'},{$set : {name : 'vivo z12 pro',brand : 'vivo_proo',price : 10000,category : 'mobile'}})
    console.log(data)
}

async function deleteInDB() {
    const Product = mongoose.model('products',ProductSchema)
    let deleted = await Product.deleteOne({brand : 'vivo_proo'})
    console.log(deleted)
}


deleteInDB()