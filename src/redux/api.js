import axios from "axios";

const NODE_ENV = "production"
const API = axios.create({
    baseURL: NODE_ENV === "production" ?  "https://api.alltasko.com/" : "http://localhost:5001/",
    headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default API;
