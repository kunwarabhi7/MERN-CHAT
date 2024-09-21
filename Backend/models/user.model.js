import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    unique:true},
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})
const User = mongoose.model("User",UserSchema);

export default User;