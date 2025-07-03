'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil } from 'lucide-react'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { API } from "@/lib/data-service";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
export default function UpdateCategoryDialog({ category, fetchData }) {
    const [editPricing, setEditPricing] = useState({
        id: '',
        pricing: 0,
        name: '',
        description: '',
        estimatedPrice: '',
        servicePicture: '',
        imageFile: null
    });
    const handleUpdateCategory = async () => {
        try {
            const formData = new FormData();

            // Append all fields to FormData if they exist
            if (editPricing.name) formData.append('name', editPricing.name);
            if (editPricing.pricing) formData.append('pricing', editPricing.pricing);
            if (editPricing.description) formData.append('description', editPricing.description);
            if (editPricing.estimatedPrice) formData.append('estimatedPrice', editPricing.estimatedPrice);
            if (editPricing.imageFile) formData.append('image', editPricing.imageFile);

            const response = await axios.put(
                `${API}/api/category/update-category/${editPricing.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast.success('Category updated successfully');
            fetchData();
            setEditPricing({
                id: '',
                pricing: 0,
                name: '',
                description: '',
                estimatedPrice: 0,
                servicePicture: '',
                imageFile: null
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update category');
            console.error('Error updating category:', error);
        }
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditPricing({
                            id: category._id,
                            pricing: category.pricing,
                            name: category.name,
                            description: category.description,
                            estimatedPrice: category.estimatedPrice,
                            servicePicture: category.servicePicture
                        })}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update {category.name}</DialogTitle>
                        <DialogDescription>
                            Update the category details below
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                id="name"
                                value={editPricing.name}
                                onChange={(e) => setEditPricing({
                                    ...editPricing,
                                    name: e.target.value
                                })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={editPricing.description || ''}
                                onChange={(e) => setEditPricing({
                                    ...editPricing,
                                    description: e.target.value
                                })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="pricing">Pricing (in cents)</Label>
                                <Input
                                    id="pricing"
                                    type="number"
                                    value={editPricing.pricing}
                                    onChange={(e) => setEditPricing({
                                        ...editPricing,
                                        pricing: Number(e.target.value)
                                    })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="estimatedPrice">Estimated Price </Label>
                                <Input
                                    id="estimatedPrice"
                                    type="text"
                                    value={editPricing.estimatedPrice || ''}
                                    onChange={(e) => setEditPricing({
                                        ...editPricing,
                                        estimatedPrice: e.target.value
                                    })}
                                    placeholder="eg: $100-$200"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Category Image</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setEditPricing({
                                            ...editPricing,
                                            imageFile: e.target.files[0]
                                        });
                                    }
                                }}
                            />
                            {editPricing.servicePicture && !editPricing.imageFile && (
                                <img
                                    src={editPricing.servicePicture}
                                    alt="Current"
                                    className="h-20 w-20 rounded-md object-cover mt-2"
                                />
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdateCategory}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    )
}