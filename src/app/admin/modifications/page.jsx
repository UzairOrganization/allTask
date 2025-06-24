'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'


export default function page() {
    const [categories, setCategories] = useState([])
    const [formConfigs, setFormConfigs] = useState([])
    const [loading, setLoading] = useState({ categories: true, forms: true })
    const [newCategory, setNewCategory] = useState({
        name: '',
        pricing: 1500,
        description: '',
        estimatedPrice: '',
        servicePicture: null // For file upload
    });
    const [editPricing, setEditPricing] = useState({
        id: '',
        pricing: 0,
        name: '',
        description: '',
        estimatedPrice: '',
        servicePicture: '',
        imageFile: null
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState(null)

    // Form Config State
    const [newFormConfig, setNewFormConfig] = useState({
        serviceType: '',
        questions: [{
            fieldName: '',
            questionText: '',
            fieldType: 'text',
            options: [],
            required: false,
            placeholder: ''
        }]
    })
    const [editFormConfig, setEditFormConfig] = useState(null)
    const [activeTab, setActiveTab] = useState('categories')

    // Fetch all data
    const fetchData = async () => {
        try {
            setLoading(prev => ({ ...prev, categories: true }))
            const categoriesRes = await axios.get(`${API}/api/category/get-all-categories`)
            if (categoriesRes.data.success) {
                setCategories(categoriesRes.data.data)
            }
        } catch (error) {
            toast.error('Failed to fetch categories')
        } finally {
            setLoading(prev => ({ ...prev, categories: false }))
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    // Category handlers (unchanged from your existing code)
    const handleCreateCategory = async () => {
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
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to create category');
        }
    };
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

    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`${API}/api/category/delete-category/${categoryToDelete}`)
            toast.success('Category deleted successfully')
            setDeleteDialogOpen(false)
            fetchData()
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete category')
        }
    }

    // Form Config Handlers
    const handleCreateFormConfig = async () => {
        try {
            const response = await axios.post(`${API}/api/leads/create-form-config`, newFormConfig)
            toast.success('Form configuration created successfully')
            setNewFormConfig({
                serviceType: '',
                questions: [{
                    fieldName: '',
                    questionText: '',
                    fieldType: 'text',
                    options: [],
                    required: false,
                    placeholder: ''
                }]
            })
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create form configuration')
        }
    }

    const handleAddQuestion = () => {
        setNewFormConfig(prev => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    fieldName: '',
                    questionText: '',
                    fieldType: 'text',
                    options: [],
                    required: false,
                    placeholder: ''
                }
            ]
        }))
    }

    const handleRemoveQuestion = (index) => {
        if (newFormConfig.questions.length <= 1) return
        setNewFormConfig(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }))
    }

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...newFormConfig.questions]
        updatedQuestions[index][field] = value
        setNewFormConfig(prev => ({
            ...prev,
            questions: updatedQuestions
        }))
    }

    const handleAddOption = (questionIndex) => {
        const updatedQuestions = [...newFormConfig.questions]
        updatedQuestions[questionIndex].options = [
            ...updatedQuestions[questionIndex].options,
            ''
        ]
        setNewFormConfig(prev => ({
            ...prev,
            questions: updatedQuestions
        }))
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...newFormConfig.questions]
        updatedQuestions[questionIndex].options[optionIndex] = value
        setNewFormConfig(prev => ({
            ...prev,
            questions: updatedQuestions
        }))
    }

    const handleRemoveOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...newFormConfig.questions]
        updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
            (_, i) => i !== optionIndex
        )
        setNewFormConfig(prev => ({
            ...prev,
            questions: updatedQuestions
        }))
    }

    const handleDeleteFormConfig = async (id) => {
        try {
            await axios.delete(`${API}/api/leads/delete-form-config/${id}`)
            toast.success('Form configuration deleted successfully')
            fetchData()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete form configuration')
        }
    }

    return (
        <>
            <AdminHeader />
            <div className="container mx-auto py-8">
                <Toaster position="bottom-left" richColors />

                <Tabs defaultValue="categories" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Service Configuration</h1>
                        <TabsList>
                            <TabsTrigger value="categories" onClick={() => setActiveTab('categories')}>
                                Categories
                            </TabsTrigger>
                            <TabsTrigger value="forms" onClick={() => setActiveTab('forms')}>
                                Form Configs
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="categories">
                        {/* Categories Section (your existing code) */}
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
                                    className="gap-2"
                                >
                                    <Plus className="h-4 w-4" /> Add Category
                                </Button>
                            </div>
                        </div>

                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category Name</TableHead>
                                        <TableHead>Pricing</TableHead>
                                        <TableHead>Estimated Pricing</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading.categories ? (
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
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        {category.servicePicture && (
                                                            <img
                                                                src={category.servicePicture}
                                                                alt={category.name}
                                                                className="h-10 w-10 rounded-md object-cover"
                                                            />
                                                        )}
                                                        <div>
                                                            <p>{category.name}</p>
                                                            {/* {category.description && (
                                                                <p className="text-xs text-gray-500">{category.description}</p>
                                                            )} */}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>${(category.pricing / 100).toFixed(2)}</TableCell>
                                                <TableCell>
                                                    {category.estimatedPrice ? `${category.estimatedPrice}` : "NaN  "}
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
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
                                                                                estimatedPrice: Number(e.target.value)
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
                    </TabsContent>

                    <TabsContent value="forms">
                        {/* Form Configurations Section */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Create New Form Configuration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="mb-2">Service Type</Label>
                                            <select
                                                value={newFormConfig.serviceType}
                                                onChange={(e) => setNewFormConfig({
                                                    ...newFormConfig,
                                                    serviceType: e.target.value
                                                })}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Select a service type</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {newFormConfig.questions.map((question, qIndex) => (
                                            <div key={qIndex} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="font-medium">Question {qIndex + 1}</h3>
                                                    {newFormConfig.questions.length > 1 && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleRemoveQuestion(qIndex)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <Label className={"mb-2"}>Field Name</Label>
                                                        <Input
                                                            value={question.fieldName}
                                                            onChange={(e) => handleQuestionChange(qIndex, 'fieldName', e.target.value)}
                                                            placeholder="e.g., plumbingWorkType"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className={"mb-2"}>Question Text</Label>
                                                        <Input
                                                            value={question.questionText}
                                                            onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                                                            placeholder="What type of plumbing work is needed?"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <Label className={"mb-2"}>Field Type</Label>
                                                        <select
                                                            value={question.fieldType}
                                                            onChange={(e) => handleQuestionChange(qIndex, 'fieldType', e.target.value)}
                                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            <option value="text">Text Input</option>
                                                            <option value="radio">Radio Buttons</option>
                                                            <option value="checkbox">Checkboxes</option>
                                                            <option value="select">Dropdown Select</option>
                                                            <option value="number">Number Input</option>
                                                            <option value="date">Date Picker</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-end">
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`required-${qIndex}`}
                                                                checked={question.required}
                                                                onCheckedChange={(checked) => handleQuestionChange(qIndex, 'required', checked)}
                                                            />
                                                            <Label htmlFor={`required-${qIndex}`}>Required</Label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {['radio', 'checkbox', 'select'].includes(question.fieldType) && (
                                                    <div className="space-y-2">
                                                        <Label>Options</Label>
                                                        {question.options.map((option, oIndex) => (
                                                            <div key={oIndex} className="flex items-center gap-2">
                                                                <Input
                                                                    value={option}
                                                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                                    placeholder={`Option ${oIndex + 1}`}
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-500 hover:text-red-700"
                                                                    onClick={() => handleRemoveOption(qIndex, oIndex)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2"
                                                            onClick={() => handleAddOption(qIndex)}
                                                        >
                                                            <Plus className="h-4 w-4 mr-2" /> Add Option
                                                        </Button>
                                                    </div>
                                                )}

                                                {question.fieldType === 'text' && (
                                                    <div>
                                                        <Label className={"mb-2"}>Placeholder Text</Label>
                                                        <Input
                                                            value={question.placeholder || ''}
                                                            onChange={(e) => handleQuestionChange(qIndex, 'placeholder', e.target.value)}
                                                            placeholder="e.g., Enter your answer here"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            variant="outline"
                                            onClick={handleAddQuestion}
                                        >
                                            <Plus className="h-4 w-4 mr-2" /> Add Question
                                        </Button>
                                        <Button
                                            onClick={handleCreateFormConfig}
                                            disabled={!newFormConfig.serviceType || newFormConfig.questions.some(q => !q.fieldName || !q.questionText)}
                                        >
                                            Create Form Configuration
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Existing Form Configurations */}
                        {/* <Card>
                            <CardHeader>
                                <CardTitle>Existing Form Configurations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading.forms ? (
                                    <div className="text-center py-8">Loading form configurations...</div>
                                ) : formConfigs.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">No form configurations found</div>
                                ) : (
                                    <div className="space-y-4">
                                        {formConfigs.map((config) => (
                                            <div key={config._id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div>
                                                        <h3 className="font-medium">{config.serviceType}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            {config.questions.length} question{config.questions.length !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDeleteFormConfig(config._id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {config.questions.map((q, qIndex) => (
                                                        <div key={qIndex} className="bg-gray-50 p-3 rounded-md">
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <p className="font-medium">{q.questionText}</p>
                                                                    <div className="flex gap-2 mt-1">
                                                                        <Badge variant="outline">{q.fieldType}</Badge>
                                                                        {q.required && <Badge variant="default">Required</Badge>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {q.options.length > 0 && (
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">Options:</p>
                                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                                        {q.options.map((opt, oIndex) => (
                                                                            <Badge key={oIndex} variant="secondary">{opt}</Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card> */}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}