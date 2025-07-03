'use client'

import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Plus } from 'lucide-react'
import { Button } from "../ui/button";
import axios from "axios";
import { API } from "@/lib/data-service";
import { toast } from "sonner";


export default function CategoryForm({ fetchData }) {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState({ categories: false, forms: true })
    const [newCategory, setNewCategory] = useState({
        name: '',
        pricing: 1500,
        description: '',
        estimatedPrice: '',
        servicePicture: null // For file upload
    });
    const handleCreateCategory = async () => {
        setLoading({ categories: true })
        try {
            const formData = new FormData();

            // Append all fields to formData
            formData.append('name', newCategory.name);
            formData.append('pricing', newCategory.pricing);
            formData.append('description', newCategory.description);
            formData.append('estimatedPrice', newCategory.estimatedPrice);
            if (newCategory.servicePicture) {
                formData.append('image', newCategory.servicePicture);
            }

            const response = await axios.post(`${API}/api/category/create-category`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Category created successfully');
            setNewCategory({
                name: '',
                pricing: 1500,
                description: '',
                estimatedPrice: '',
                servicePicture: null
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            fetchData()
            setLoading({ categories: false })
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to create category');
        }
    };
    return (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label>Category Name</Label>
                        <Input
                            placeholder="Category name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Pricing (in cents)</Label>
                        <Input
                            type="number"
                            placeholder="Pricing"
                            value={newCategory.pricing}
                            onChange={(e) => setNewCategory({ ...newCategory, pricing: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label>Estimated Price (display text)</Label>
                        <Input
                            placeholder="e.g., $100-$200"
                            value={newCategory.estimatedPrice}
                            onChange={(e) => setNewCategory({ ...newCategory, estimatedPrice: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Category Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            required
                            ref={fileInputRef}
                            onChange={(e) => setNewCategory({ ...newCategory, servicePicture: e.target.files[0] })}
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label>Description</Label>
                    <Textarea
                        required
                        placeholder="Category description"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                </div>

                <Button
                    onClick={handleCreateCategory}
                    disabled={!newCategory.name || !newCategory.description || !newCategory.servicePicture || loading.categories}
                    className="gap-2 cursor-pointer"
                >
                    <Plus className="h-4 w-4" /> Add Category
                </Button>
            </div>
        </div>
    )
}