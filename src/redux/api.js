import axios from "axios";

const API = axios.create({
    baseURL: "http://107.22.128.80:5000/",
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
