'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { toast, Toaster } from "sonner"
import { API } from '@/lib/data-service'
import AdminHeader from '@/components/AdminHeader'

export default function page() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [newCategory, setNewCategory] = useState({ name: '', pricing: 1500 })
    const [editPricing, setEditPricing] = useState({ id: '', pricing: 0, name: '' })
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState(null)

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API}/api/category/get-all-categories`)
            if (response.data.success) {
                setCategories(response.data.data)
            }
        } catch (error) {
            toast.error('Failed to fetch categories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    // Create new category
    const handleCreateCategory = async () => {
        try {
            const response = await axios.post(`${API}/api/category/create-category`, newCategory)
            toast.success('Category created successfully')
            setNewCategory({ name: '', pricing: 1500 })
            fetchCategories()
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to create category')
        }
    }

    // Update category pricing
    const handleUpdatePricing = async () => {
        try {
            const response = await axios.put(
                `${API}/api/category/update-category-pricing/${editPricing.id}`,
                { pricing: editPricing.pricing }
            )
            toast.success('Pricing updated successfully')
            fetchCategories()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update pricing')
        }
    }

    // Delete category
    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`${API}/api/category/delete-category/${categoryToDelete}`)
            toast.success('Category deleted successfully')
            setDeleteDialogOpen(false)
            fetchCategories()
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete category')
        }
    }

    return (
        <>
            <AdminHeader />
            <div className="container mx-auto py-8">
                <Toaster position="bottom-left" richColors />
                <h1 className="text-2xl font-bold mb-6">Category Management</h1>

                {/* Create Category Section */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                    <div className="flex gap-4">
                        <Input
                            placeholder="Category name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Pricing"
                            value={newCategory.pricing}
                            onChange={(e) => setNewCategory({ ...newCategory, pricing: Number(e.target.value) })}
                            className="w-32"
                        />
                        <Button
                            onClick={handleCreateCategory}
                            disabled={!newCategory.name}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" /> Add Category
                        </Button>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Pricing</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-4">
                                        Loading categories...
                                    </TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-4">
                                        No categories found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>${(category.pricing / 100).toFixed(2)}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {/* Edit Pricing Dialog */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setEditPricing({
                                                            id: category._id,
                                                            pricing: category.pricing,
                                                            name: category.name
                                                        })}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Update Pricing for {category.name}</DialogTitle>
                                                        <DialogDescription>
                                                            Enter the new pricing amount in cents (e.g., 1500 = $15.00)
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <Input
                                                            type="number"
                                                            value={editPricing.pricing}
                                                            onChange={(e) => setEditPricing({
                                                                ...editPricing,
                                                                pricing: Number(e.target.value)
                                                            })}
                                                        />
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={handleUpdatePricing}>
                                                            Save Changes
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            {/* Delete Confirmation Dialog */}
                                            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => setCategoryToDelete(category._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete the {category.name} category.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={handleDeleteCategory}
                                                        >
                                                            Delete Category
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}