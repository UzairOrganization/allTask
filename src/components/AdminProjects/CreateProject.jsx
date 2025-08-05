'use client'

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UploadCloud } from "lucide-react"
import { toast } from "sonner"
import { API } from "@/lib/data-service"

const CreateProject = ({ fetchProject, fetchCategories, categories }) => {
    // State for categories
    // const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [category, setCategory] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    // const [titles, setTitles] = useState([])
    const fileInputRef = useRef(null)
    // const fetchCategories = async () => {
    //     setLoading(true);
    //     setError("");
    //     try {
    //         const [categoriesResponse, titlesResponse] = await Promise.all([
    //             axios.get(`${API}/api/category/get-all-categories`),
    //             axios.get(`${API}/api/projects/get-all-titles`)
    //         ]);

    //         // Extract titles and categories from responses
    //         const allTitles = titlesResponse.data.title.map(item => item.title);
    //         const allCategories = Array.isArray(categoriesResponse.data)
    //             ? categoriesResponse.data
    //             : Array.isArray(categoriesResponse.data?.data)
    //                 ? categoriesResponse.data.data
    //                 : [];

    //         // Filter out categories whose names exist in titles
    //         const filteredCategories = allCategories.filter(
    //             category => !allTitles.includes(category.name || category.category)
    //         );

    //         setTitles(titlesResponse.data);
    //         setCategories(filteredCategories);
    //     } catch (err) {
    //         console.error("Error fetching data:", err);
    //         toast.error("Failed to load categories");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            if (files.length > 10) {
                toast.error("You can upload a maximum of 10 images at once")
                return
            }

            // Validate file sizes
            const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024)
            if (oversizedFiles.length > 0) {
                toast.error(`Some files exceed 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`)
                return
            }

            setSelectedFiles(files)
        }
    }

    // Handle project creation
    const handleUpload = async () => {
        // if (!title) {
        //     toast.error("Please enter a project title")
        //     return
        // }

        if (!category) {
            toast.error("Please select a category")
            return
        }

        if (selectedFiles.length === 0) {
            toast.error("Please select at least one image")
            return
        }

        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append("title", category.category)
            formData.append("category", category._id)
            selectedFiles.forEach(file => formData.append("images", file))

            const response = await axios.post(`${API}/api/projects`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            toast.success("Project created successfully!")
            // Reset form on success
            await fetchProject()
            await fetchCategories()
            setCategory("")
            setSelectedFiles([])
            if (fileInputRef.current) fileInputRef.current.value = ""
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to create project")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Project</CardTitle>
                    <CardDescription>
                        Upload up to 10 images for your project gallery
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Category Select */}
                    <div className="space-y-2 w-full">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={category}
                            onValueChange={setCategory}
                            className="w-full"
                            disabled={loading}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={loading ? "Loading categories..." : "Select a category"} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label>Images</Label>
                        <div
                            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Up to 10 images (5MB each)
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Selected Files Preview */}
                    {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                            <Label>Selected Files ({selectedFiles.length})</Label>
                            <ScrollArea className="h-32 rounded-md border p-2">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-1"
                                    >
                                        <span className="text-sm truncate">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {(file.size / 1024 / 1024).toFixed(2)}MB
                                        </span>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={handleUpload}
                        disabled={isUploading || loading}
                        className="w-full"
                    >
                        {isUploading ? "Uploading..." : "Create Project"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateProject