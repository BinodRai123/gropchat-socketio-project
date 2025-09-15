import axios from "../../utils/axios";

export const registerUser = async ({userName, email, password}) => {
    const response = await axios.post("/api/auth/register", {userName, email, password});
    return response;
}

export const loginUser = async({email, password}) => {
    const response = await axios.post("/api/auth/login", {email, password});

    return response;
}