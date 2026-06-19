import api from "./Api";

export const getMembers = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
        throw new Error("Token not found");
    }

    const res = await api.get("/getMember", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const addMember = async (phoneno)=>{
     const token = localStorage.getItem("userToken");

    if (!token) {
        throw new Error("Token not found");
    }

    const res = await api.post("/addMember",{phno:phoneno},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}