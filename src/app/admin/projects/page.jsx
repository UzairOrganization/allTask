'use client'
import AdminHeader from "@/components/AdminHeader"
import { Toaster, toast } from "sonner"
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, UploadCloud } from "lucide-react"
import { useState, useRef, ChangeEvent, useEffect } from "react"
import Image from "next/image"
import CreateProject from "@/components/AdminProjects/CreateProject"
import { API } from "@/lib/data-service"
import axios from "axios"
import ProjectsGallery from "@/components/AdminProjects/ProjectsGallery"
import AddImagesInProject from "@/components/AdminProjects/AddImagesInProject"

const page = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [projects, setProjects] = useState([]) // Replace with your project type
    const [accordionValue, setAccordionValue] = useState(null);
    const [titles, setTitles] = useState([])
    const [category, setCategory] = useState("")
    const fileInputRef = useRef(null);
    const [categories, setCategories] = useState([])
    const fetchProject = async () => {
        setLoading(true)
        setError("")
        try {
            const response = await axios.get(`${API}/api/projects/get-all-projects`)
            setProjects(response.data.projects)
        } catch (err) {
            console.log(err);

            toast.error("Failed to load projects")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProject()
    }, [])
    const fetchCategories = async () => {
        setLoading(true);
        setError("");
        try {
            const [categoriesResponse, titlesResponse] = await Promise.all([
                axios.get(`${API}/api/category/get-all-categories`),
                axios.get(`${API}/api/projects/get-all-titles`)
            ]);

            // Extract titles and categories from responses
            const allTitles = titlesResponse.data.title.map(item => item.title);
            const allCategories = Array.isArray(categoriesResponse.data)
                ? categoriesResponse.data
                : Array.isArray(categoriesResponse.data?.data)
                    ? categoriesResponse.data.data
                    : [];

            // Filter out categories whose names exist in titles
            const filteredCategories = allCategories.filter(
                category => !allTitles.includes(category.name || category.category)
            );

            setTitles(titlesResponse.data);
            setCategories(filteredCategories);
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteImage = async (projectId, imageUrl) => {
        try {
            const response = await fetch(`${API}/api/projects/${projectId}/images/${encodeURIComponent(imageUrl)}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Delete failed")

            const updatedProjects = projects.map(project => {
                if (project._id === projectId) {
                    return {
                        ...project,
                        gallery: project.gallery.filter((img) => img !== imageUrl)
                    }
                }
                return project
            })

            setProjects(updatedProjects)

            toast.success("Image deleted successfully!")
        } catch (error) {
            console.error("Delete error:", error)
            toast.error("Failed to delete image")
        }
    }

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await fetch(`${API}/api/projects/${projectId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Delete failed");
            }

            // Remove the deleted project from state
            setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
            await fetchCategories()
            toast.success("Project deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error.message || "Failed to delete project");
        }
    };



    return (
        <>
            <AdminHeader />
            <Toaster position="bottom-left" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}

                    <CreateProject fetchProject={fetchProject} fetchCategories={fetchCategories} categories={categories} />

                    {/* Projects List */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <div>

                                        <CardTitle>Project Gallery</CardTitle>
                                        <CardDescription>
                                            Manage your existing projects and images
                                        </CardDescription>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {projects.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No projects yet. Upload your first project!
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                            value={accordionValue}
                                            onValueChange={setAccordionValue}
                                        >
                                            {projects.map((project, index) => (
                                                <AccordionItem key={project._id} value={`item-${project._id}`}>
                                                    <AccordionTrigger className="flex w-full relative justify-between items-center">
                                                        <div>
                                                            <h3 className="font-medium">{project.title}</h3>
                                                        </div>
                                                        <div className="flex gap-2 absolute right-12">
                                                            <AddImagesInProject project={project._id} fetchProject={fetchProject} />
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDeleteProject(project._id)}
                                                                className={"cursor-pointer"}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete Project
                                                            </Button>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                                            <ProjectsGallery project={project} handleDeleteImage={handleDeleteImage} />
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div >
        </>
    )
}
export default page