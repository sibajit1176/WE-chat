import api from "./Api"

const token = localStorage.getItem("userToken");


export const getMessage = async (chatId) => {

    if (!token) {
        throw new Error("Token not found");
    }
    const res = await api.get(`/getMessage/${chatId}`,{
         headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

export const sendMessage=async(payload)=>{
    if (!token) {
        throw new Error("Token not found");
    }
    const res=await api.post('sendMessage',payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}