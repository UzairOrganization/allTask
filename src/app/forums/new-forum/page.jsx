"use client";

import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/lib/data-service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Loader2, ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function NewForumPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tag: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API}/api/forum`, {  // Fixed: Added missing slash
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(response.statusText || "Failed to create post");
            }

            const data = await response.json();

            toast.success("Your discussion has been created!");

            router.push(`/forums/${data._id}`);
            router.refresh(); // Refresh to ensure the new post appears in listings

        } catch (error) {
            console.error("Error creating post:", error);
            toast.error(error.message || "Failed to create discussion");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ProfessionalHeader />
            <Toaster position="bottom-left" richColors />
            <div className="container mx-auto py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/forums")}
                            className="flex items-center gap-2 text-sm px-0"
                        >
                            <ArrowLeft size={16} />
                            Back to discussions
                        </Button>
                        <h1 className="text-3xl font-bold mt-4">Create New Discussion</h1>
                        <p className="text-muted-foreground mt-2">
                            Start a conversation with the community
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium">
                                Title*
                            </label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="What's on your mind?"
                                required
                                className="text-lg py-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="block text-sm font-medium">
                                Details*
                            </label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Provide more details about your discussion..."
                                className="min-h-[200px] text-base"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tag" className="block text-sm font-medium">
                                Tags
                            </label>
                            <Select
                                required
                                value={formData.tag}
                                onValueChange={(value) => setFormData({ ...formData, tag: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="General">General Discussion</SelectItem>
                                    <SelectItem value="Need Help">Need Help</SelectItem>
                                    <SelectItem value="Workplace Confusion">Workplace Issues</SelectItem>
                                    <SelectItem value="Feature">Feature Request</SelectItem>
                                    <SelectItem value="Question">Question</SelectItem>
                                    <SelectItem value="Unfair Treatment">Unfair Treatment</SelectItem>
                                    <SelectItem value="Suggestions">Suggestions</SelectItem>
                                    <SelectItem value="Payment Disputes">Payment Issues</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => router.push("/forum")}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                disabled={isSubmitting || !formData.title || !formData.content || !formData.tag}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Posting...
                                    </>
                                ) : "Start Discussion"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}