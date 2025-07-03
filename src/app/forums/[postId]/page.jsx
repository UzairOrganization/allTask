'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { API } from "@/lib/data-service";
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CornerDownLeft, MessageSquare, ThumbsUp, User } from "lucide-react";

async function getForum(postId) {
    const res = await fetch(`${API}/api/forum/${postId}`);
    if (!res.ok) throw new Error("Failed to fetch forum");
    return res.json();
}

export default function Page({ params }) {
    const [forum, setForum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!params) return;

        const fetchForum = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API}/api/forum/${params.postId}`);

                if (!res.ok) {
                    throw new Error(`Failed to fetch forum: ${res.status}`);
                }

                const data = await res.json();
                setForum(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching forum:', err);
                // toast({
                //     title: "Error",
                //     description: err.message,
                //     variant: "destructive",
                // });
            } finally {
                setLoading(false);
            }
        };

        fetchForum();

        return () => {
            // Cleanup if needed
        };
    }, [params]);

    const handleSubmitReply = async (e) => {
        e.preventDefault();
        if (!replyContent.trim()) {
            toast({
                title: "Error",
                description: "Reply cannot be empty",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            

            const res = await fetch(`${API}/api/forum/${params.postId}/reply`, {
                method: "POST",
                body: JSON.stringify({ content: replyContent }),
                headers: { "Content-Type": "application/json" },
            });
            
            // For demo purposes, we'll just add the reply locally
            const newReply = {
                _id: Date.now().toString(),
                content: replyContent,
                createdAt: new Date().toISOString(),
            };

            setForum(prev => ({
                ...prev,
                replies: [...(prev?.replies || []), newReply]
            }));

            setReplyContent("");
           
        } catch (err) {
            console.log(err)    ;
            
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderLoadingSkeleton = () => (
        <div className="space-y-8">
            <Card className="mb-8">
                <CardHeader>
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <div className="flex space-x-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                
                <div className="space-y-4 pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex items-start gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-6 space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <div className="flex justify-end">
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const renderReplies = (replies) => {
        return (
            <div className="space-y-4 pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                {replies.map((reply) => (
                    <div key={reply._id} className="space-y-2 group">
                        <div className="flex items-start gap-4">
                            <Avatar className="mt-1">
                                <AvatarImage src={reply.serviceProvider?.avatar} />
                                <AvatarFallback className="bg-blue-100 text-blue-800">
                                    {reply.serviceProvider?.name?.charAt(0) || <User size={16} />}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                        {reply.serviceProvider?.name || "Anonymous"}
                                    </h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                    </span>
                                </div>

                                <p className="mt-1 text-gray-700 dark:text-gray-300">{reply.content}</p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) return (
        <>
            <ProfessionalHeader />
            <div className="container mx-auto py-8">
                <Skeleton className="h-6 w-32 mb-6" />
                {renderLoadingSkeleton()}
            </div>
        </>
    );

    if (error) return (
        <>
            <ProfessionalHeader />
            <div className="container mx-auto max-w-6xl py-8">
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error loading forum</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                    <Link href="/forums" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        ← Back to forums
                    </Link>
                </div>
            </div>
        </>
    );

    if (!forum) return (
        <>
            <ProfessionalHeader />
            <div className="container max-w-6xl mx-auto py-8">
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forum not found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The forum you're looking for doesn't exist or may have been removed.</p>
                    <Link href="/forums" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        ← Back to forums
                    </Link>
                </div>
            </div>
        </>
    );

    return (
        <>
            <ProfessionalHeader />
            <div className="container max-w-6xl mx-auto py-8">
                <div className="mb-6">
                    <Link href="/forums" className="inline-flex items-center text-sm text-green-600 hover:text-green-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                        <CornerDownLeft size={16} className="mr-1" />
                        Back to forums
                    </Link>
                </div>

                <Card className="mb-8 transition-all hover:shadow-lg dark:hover:shadow-gray-800/50">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {forum.title}
                                </CardTitle>
                                <CardDescription className="mt-2 flex flex-wrap items-center gap-2">
                                    {forum.tag && (
                                        <span className="inline-block bg-blue-100 text-green-800 dark:bg-blue-900/30 dark:text-green-400 rounded-full px-3 py-1 text-sm font-medium">
                                            {forum.tag}
                                        </span>
                                    )}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Posted by <span className="font-medium text-gray-800 dark:text-gray-200">{forum.serviceProvider?.name || "Anonymous"}</span> •{" "}
                                        {formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}
                                    </span>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            {forum.content}
                        </p>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MessageSquare size={20} />
                        {forum.replies?.length || 0} {forum.replies?.length === 1 ? "Reply" : "Replies"}
                    </h2>

                    {forum.replies?.length > 0 ? (
                        renderReplies(forum.replies)
                    ) : (
                        <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                            <p className="text-gray-500 dark:text-gray-400">No replies yet. Be the first to respond!</p>
                        </div>
                    )}

                    <Card className="border border-blue-200 dark:border-blue-900/50">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmitReply} className="space-y-4">
                                <Textarea
                                    placeholder="Write your thoughtful reply..."
                                    className="min-h-[120px] text-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    disabled={isSubmitting}
                                />
                                <div className="flex justify-end">
                                    <Button 
                                        type="submit" 
                                        className="bg-green-600 hover:bg-green-700 text-white transition-colors"
                                        disabled={isSubmitting || !replyContent.trim()}
                                    >
                                        {isSubmitting ? "Posting..." : "Post Reply"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}