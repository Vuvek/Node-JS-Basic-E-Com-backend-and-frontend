import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
})

const UserModal = mongoose.model('users',UserSchema)

export default UserModal;