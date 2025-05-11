import axios from "axios";

const API = axios.create({
    baseURL: "https://api.alltasko.com/",
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
