import axios from "axios";

export const auth = async () => {
    try {
        const response = await axios.get(`https:/api.alltasko.com/api/users/me`, { withCredentials: true })
    } catch (error) {
        console.log(error.message);
    }
}
