import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";


const useLogout = () => {
 const [loading , setLoading]  = useState(false)
const {setAuthUser} =useAuthContext()
 const logout = async () => {
    setLoading(true);
    try {
        const res = await fetch("http://localhost:5000/api/auth/logout",{
            method:"POST",
            headers:{                "Content-Type":"application/json",    }
            
        })
        const data = await res.json() 
    if(data.error){
throw new Error (data.error)
    } 
    localStorage.removeItem("chat-user")
    setAuthUser(null);
    } catch (error) {
        console.log(error.message)
        toast.error("Error in signout", error.message)
    }
    finally{
        setLoading(false)
    }
 }
 return {loading,logout}
}

export default useLogout