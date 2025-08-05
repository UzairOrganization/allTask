import { Plus, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { toast } from "sonner";
import { API } from "@/lib/data-service";

const AddImagesInProject = ({ project, fetchProject }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length > 10) {
                toast.error("You can upload a maximum of 10 images at once");
                return;
            }

            const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
            if (oversizedFiles.length > 0) {
                toast.error(`Some files exceed 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
                return;
            }

            setSelectedFiles(files);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            toast.error("Please select at least one image to upload");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            const formData = new FormData();
            selectedFiles.forEach(file => formData.append("images", file));

            const response = await axios.post(
                `${API}/api/projects/${project}/images`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Images added successfully!");
            setSelectedFiles([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchProject()
            setOpen(false);
            // Optionally refresh project data in parent component
            // You might want to add a callback prop for this
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to add images");
            setError(error.response?.data?.message || "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Images
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Images to {project.title}</DialogTitle>
                    <DialogDescription>
                        Upload up to 10 images (5MB each) to this project.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
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

                    {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                            <Label>Selected Files ({selectedFiles.length})</Label>
                            <ScrollArea className="h-32 rounded-md border p-2">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between py-1">
                                        <span className="text-sm truncate">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {(file.size / 1024 / 1024).toFixed(2)}MB
                                        </span>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleUpload}
                        disabled={isUploading || selectedFiles.length === 0}
                    >
                        {isUploading ? "Uploading..." : "Upload Images"}
                    </Button>
                </DialogFooter>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            </DialogContent>
        </Dialog>
    );
};

export default AddImagesInProject;