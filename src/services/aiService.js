import api from "./Api"

export const predictiveTyping=async (text)=>{
    const res=await api.post("/predict",{text})
    return res.data
}
export const smartReplies=async (message)=>{
    const res=await api.post("/reply",{message})
    return res.data
}