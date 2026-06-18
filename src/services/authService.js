import api from "./Api";

export const signup=async(userData)=>{
   const response = await api.post("/signup",userData)
   return response.data
}
export const login=async(logindata)=>{
    const response=await api.post('/login',logindata)
    return response.data
}
export const getUserDetails=async()=>{
    const token = localStorage.getItem("userToken");

    if (!token) {
        throw new Error("Token not found");
    }
    const response=await api.get('/verify',{
         headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}