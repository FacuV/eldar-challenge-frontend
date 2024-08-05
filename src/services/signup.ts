import axios from "axios";

export const signup = async (name: string, middleName: string | null, lastName: string, email: string, password: string, type: number) => {
    try {
        const url = "http://149.50.135.111:5000/auth/register"
    
        const body = {
            name,
            middleName,
            lastName,
            email,
            password,
            type
        }
    
        const user = await axios.post(url, body)
    
        return user.data
    } catch (error) {
        return error
    }
};