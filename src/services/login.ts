import axios from "axios";

export const login = async (email: string, password: string) => {
    try {
        const url = "http://149.50.135.111:5000/auth/login"
    
        const body = {
            email,
            password
        }
    
        const user = await axios.post(url, body)
        
        window.sessionStorage.setItem("user", JSON.stringify(user.data))
        window.sessionStorage.setItem("token", user.data.token)
    
        return user.data
    } catch (error) {
        return error
    }
};