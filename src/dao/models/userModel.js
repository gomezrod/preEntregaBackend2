import mongoose from "mongoose";
import { type } from "node:os";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true,
    },
    role: {
        type: String,
        require: true,
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "carts"
    },
    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel