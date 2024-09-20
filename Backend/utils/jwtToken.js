import jwt from 'jsonwebtoken'


const generateJWTTOKEN = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: '15d'})
    res.cookie(
        "jwt",token,{
            maxAge: 1000*60*60*24*15, //15days
            httpOnly: true, // prevent xss attack cross site scripting attacks
            sameSite:"strict" //csrf attack cross-site request forgery attack
      , secure: process.env.NODE_ENV === "production",
        }
    )
}

export default generateJWTTOKEN;