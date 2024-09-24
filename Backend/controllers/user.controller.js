import User from "../models/user.model.js";

export const getUserForSideBar = async (req,res) =>{
    try {
const logedInUser = req.user._id;
const filteredUser = await User.find({_id : {$ne : logedInUser}}).select("-password")    
 res.status(200).json(filteredUser);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message , error:"Internal Server Error"});
    }
}
