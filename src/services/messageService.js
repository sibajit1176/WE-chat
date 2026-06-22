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

export const uploadFile = async (formData) => {

    if (!token) {
        throw new Error("Token not found");
    }

    const res = await api.post(
        "/uploadFile",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res.data;
};