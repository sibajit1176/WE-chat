import api from "./Api";

export const signup=async(userData)=>{
   const response = await api.post("/signup",userData)
   return response.data
}
export const login=async(logindata)=>{
    const response=await api.post('/login',logindata)
    return response.data
}