import axios from "axios";

export const auth = async () => {
    try {
        const response = await axios.get(`http://localhost:5000//api/users/me`, { withCredentials: true })
        console.log(response.data, "auth middleware")
    } catch (error) {
        console.log(error.message);

    }
}
