export const API = "https://api.alltasko.com"

import axios from "axios"
import { notFound } from "next/navigation"


export async function getAllCategories(params) {
    try {
        const data = await axios.get(`${API}/api/category/categories`)        
        return data.data;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getSubCategoryWithSubSubCategories(category) {
    try {
        const data = await axios.get(`${API}/api/category/sub-cat/${category}`)
        return data.data
    } catch (error) {
        notFound()
    }
}