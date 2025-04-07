'use client'

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

const StageTwo = ({ finalFormData, setPhotos, setFormData, next, back }) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        selectedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64 = event.target.result;

                setFiles((prev) => [
                    ...prev,
                    {
                        file,
                        preview: base64,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    }
                ]);
            };

            reader.readAsDataURL(file); // Convert to base64 for preview
        });
    };


    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(prev => [
            ...prev,
            ...droppedFiles.map(file => ({
                file,
                preview: base64, // This is now a base64 data URL instead of a blob URL
                name: file.name,
                size: file.size,
                type: file.type
            }))
        ]);
    };

    const removeFile = (index) => {
        URL.revokeObjectURL(files[index].preview);
        setFiles(prev => prev.filter((_, i) => i !== index));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            files.forEach(({ file }) => {
                finalFormData.append('photos', file); // "photos" matches backend fieldname
            });
            setFormData({ files })
            next();
        } catch (err) {
            console.error('Error uploading:', err);
        } finally {
            setIsSubmitting(false);
        }
    };



    // Cleanup object URLs
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <Card className="shadow-lg overflow-hidden border border-gray-100">
                <CardHeader className="bg-[#00725A] p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                        Upload Photos of Your Project (Optional)
                    </h2>
                </CardHeader>
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-[#00725A] bg-[#00725A]/10' : 'border-gray-300'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <UploadCloud className="h-12 w-12 text-[#00725A]" />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-medium text-[#00725A] hover:text-[#00634A] focus-within:outline-none"
                                    >
                                        <span>Upload photos</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>

                        {/* Preview of uploaded files */}
                        {files.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">
                                    Selected Photos ({files.length})
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {files.map(({ file, preview }, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={preview}
                                                    alt={file.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                            <div className="mt-1 truncate text-xs text-gray-500">
                                                {file.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-8">
                            <Button
                                type="button"
                                onClick={back}
                                variant="outline"
                                className="px-4 py-2 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 text-sm bg-[#00725A] hover:bg-[#00634A] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Continue'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default StageTwo;