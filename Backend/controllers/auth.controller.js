import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generateJWTTOKEN from '../utils/jwtToken.js';

export const signup = async (req,res)=>{
    try {
        //check for all required field are filled 
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if(!fullName ||!username ||!password ||!confirmPassword ||!gender) {
            return res.status(400).json({error: "All fields are required"})
        }
        //check if paasword and confirm password are same
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"})
        }
        // Hash passowrd here
const salt =  await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);
        //gender decide here 
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
const girlProfilePic =  `https://avatar.iran.liara.run/public/girl?username=${username}`
const profilePic = gender === 'male' ? boyProfilePic : girlProfilePic;

// create a user 
const newUser = new User({
    fullName,
    username,
    password:hashedPassword
    , gender,
    profilePic
})

//
if(newUser){
await generateJWTTOKEN(newUser._id,res)
    await newUser.save()
    res.status(201).json({message: "User created successfully"
        ,
        _id: newUser._id, username: newUser.username , fullName: newUser.fullName , profilePic: newUser.profilePic
    })
}else{
    res.status(400).json({error: "User not created , invalid User Data"})
}
    } catch (error) {
        console.log("Error in SignUp User" ,error.message);
        res.status(500).json({error: "Internal Server Error" , message: error.message})
    }

}
export const login = (req,res)=>{
    res.send("Login Page")
}

export const logout = (req,res)=>{
    res.send("LogOut Page")
}