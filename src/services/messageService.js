import api from "./Api"


export const getMessage = async (chatId) => {
      const token = localStorage.getItem("userToken");

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