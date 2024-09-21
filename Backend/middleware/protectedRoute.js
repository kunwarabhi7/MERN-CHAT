import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectedRoute =async (req,res,next) => {
try {
const token = req.cookies.jwt;
if(!token) {
    return res.status(401).json({error: "Please login first"})
}    
const decode = jwt.verify(token,process.env.JWT_SECRET);
if(!decode){
    return res.status(401).json({error: "Unauthorized user. Invalid token"})
}
const user = await User.findById(decode.userId).select("-password");
if(!user){
    return res.status(401).json({error: "Unauthorized user. Invalid user"})
}
req.user = user
next();

} catch (error) {
    console.log("Error in protected Route" ,error.message);
    res.status(500).json({error: "Internal Server Error" , message: error.message})
}
}

export default protectedRoute