import { useState } from "react"
import toast from 'react-hot-toast'
const useSignup = () => {
const [loading, setLoading] = useState(false)
const signup = async({fullName,username,password,gender,confirmPassword})=>{
    const success = handleInputError({fullName,username,password,confirmPassword,gender})
    if(!success)return;

    try {
         setLoading(true)
         const res = await fetch("http://localhost:5000/api/auth/signup",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName,username,password,gender,confirmPassword})
         })
         const data = await res.json()
         console.log(data);
         
    } catch (error) {
    toast.error(error.message)
        console.log(error.message)
    }finally{
        setLoading(false)
    }
}
return {loading,signup}
}

export default useSignup

const handleInputError = async ({fullName,username,password,confirmPassword,gender}) =>{
if(!fullName || !username || !password || !confirmPassword || !gender){
    toast.error("Please fill all fields")
    return false
}
if(password != confirmPassword){
    toast.error("Password does not match")
return false
}
if(password.length<6){
    toast.error("Password should be at least 6 characters long")
return false;
}
return true
}