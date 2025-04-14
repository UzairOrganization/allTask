export const API = "http://localhost:5000"

import axios from "axios"
import { notFound } from "next/navigation"


export async function getAllCategories(params) {
    try {
        const data = await axios.get(`${API}/api/category/categories`)
        return data.data;
    } catch (error) {
        notFound()
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