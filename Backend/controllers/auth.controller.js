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
 generateJWTTOKEN(newUser._id,res)
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
export const login =async (req,res)=>{
    try {
   const {username,password} = req.body;
   if(!username || !password){
       return res.status(400).json({error: "All fields are required"})
   }
   const user = await User.findOne({username});
   const isPasswordCorrect = await bcrypt.compare(password,user?.password || '');
   if(!user ||!isPasswordCorrect){
       return res.status(401).json({error: "Invalid username or password"})
   } 
   generateJWTTOKEN(user?._id,res);
//    console.log(user,'userrr')
   res.status(200).json({
    username:user.username,_id:user._id,
    profilePic: user.profilePic, fullName:user.fullName
   })
    } catch (error) {
        console.log("Error in SignIN User" ,error.message);
        res.status(500).json({error: "Internal Server Error" , message: error.message})
   
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge: 1});
        res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.log("Error in Logout User" ,error.message);
        res.status(500).json({error: "Internal Server Error" , message: error.message})

    }
}