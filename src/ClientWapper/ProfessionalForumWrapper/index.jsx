'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { API } from "@/lib/data-service";
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from 'next/navigation'
import { Search, Plus } from "lucide-react";


export default function ProfessionalForumWrapper() {

    const { provider } = useSelector(state => state.auth);
    const [forums, setForums] = useState([])
    const [providerForums, setProviderForums] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()
    
    useEffect(() => {
        const fetchAllForums = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API}/api/forum`);

                if (!res.ok) {
                    throw new Error("Failed to fetch forums");
                }

                const data = await res.json();
                setForums(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        const fetchProviderForums = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API}/api/forum/serviceProvider`, {
                    withCredentials: true
                });

                setProviderForums(data);
                setError(null);
            } catch (err) {
                const errorMessage = axios.isAxiosError(err)
                    ? err.response?.data?.message || err.message
                    : 'An unknown error occurred';

                setError(errorMessage);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllForums()
        fetchProviderForums()
    }, [])
    
    return (
        <>
            <ProfessionalHeader />

            <div className="container mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold">Community Forum</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                                placeholder="Search forums..." 
                                className="pl-10 w-full"
                            />
                        </div>
                        <Link href="/forums/new-forum" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto cursor-pointer flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                <span>Start Discussion</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                
                {/* Tabs Section */}
                <div className="container mx-auto my-6">
                    <Tabs defaultValue="All Discussions">
                        <div className="flex justify-center sm:justify-end my-4">
                            <TabsList className="grid grid-cols-2 w-full sm:w-auto">
                                <TabsTrigger value="All Discussions" className="text-xs sm:text-sm">
                                    All Discussions
                                </TabsTrigger>
                                <TabsTrigger value="Your Discussions" className="text-xs sm:text-sm">
                                    Your Discussions
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        
                        {/* All Discussions Tab */}
                        <TabsContent value="All Discussions" className="my-6 sm:my-10">
                            {loading ? (
                                <ForumSkeleton />
                            ) : (
                                <div className="grid gap-4 sm:gap-6">
                                    {forums.length === 0 && (
                                        <Card>
                                            <CardContent className="py-8 text-center">
                                                <p className="text-gray-600">No forum posts yet. Be the first to start a discussion!</p>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {forums.map((forum) => (
                                        <Link key={forum._id} href={`/forums/${forum._id}`} className="block">
                                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                                <CardHeader className="p-4 sm:p-6">
                                                    <div className="flex justify-between items-start">
                                                        <div className="w-full">
                                                            <CardTitle className="text-lg sm:text-xl mb-2">
                                                                {forum.title}
                                                            </CardTitle>
                                                            <CardDescription className="flex flex-wrap gap-2 items-center mt-2">
                                                                {forum.tag && (
                                                                    <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">
                                                                        {forum.tag}
                                                                    </span>
                                                                )}
                                                                <span className="text-xs sm:text-sm">
                                                                    Posted {formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}
                                                                </span>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-4 sm:p-6 pt-0">
                                                    <p className="line-clamp-3 text-gray-600 text-sm sm:text-base mb-4">
                                                        {forum.content.slice(0, 500)}...
                                                    </p>
                                                    <div className="flex justify-end">
                                                        <Button 
                                                            className="bg-green-700 hover:bg-green-800 cursor-pointer text-xs sm:text-sm"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                router.push(`/forums/${forum._id}`);
                                                            }}
                                                        >
                                                            Read More
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                        
                        {/* Your Discussions Tab */}
                        <TabsContent value="Your Discussions" className="my-6 sm:my-10">
                            {loading ? (
                                <ForumSkeleton />
                            ) : (
                                <div className="grid gap-4 sm:gap-6">
                                    {providerForums.length === 0 ? (
                                        <Card>
                                            <CardContent className="py-8 text-center">
                                                <p className="text-gray-600">No forum posts yet. Be the first to start a discussion!</p>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        providerForums.map((forum) => (
                                            <Link key={forum._id} href={`/forums/${forum._id}`} className="block">
                                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                                    <CardHeader className="p-4 sm:p-6">
                                                        <div className="flex justify-between items-start">
                                                            <div className="w-full">
                                                                <CardTitle className="text-lg sm:text-xl mb-2">
                                                                    {forum.title}
                                                                </CardTitle>
                                                                <CardDescription className="flex flex-wrap gap-2 items-center mt-2">
                                                                    {forum.tag && (
                                                                        <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">
                                                                            {forum.tag}
                                                                        </span>
                                                                    )}
                                                                    <span className="text-xs sm:text-sm">
                                                                        Posted {formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}
                                                                    </span>
                                                                </CardDescription>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="p-4 sm:p-6 pt-0">
                                                        <p className="line-clamp-3 text-gray-600 text-sm sm:text-base mb-4">
                                                            {forum.content.slice(0, 500)}...
                                                        </p>
                                                        <div className="flex justify-end">
                                                            <Button 
                                                                className="bg-green-700 hover:bg-green-800 cursor-pointer text-xs sm:text-sm"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    router.push(`/forums/${forum._id}`);
                                                                }}
                                                            >
                                                                Read More
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export function ForumSkeleton() {
    return (
        <div className="container mx-auto py-6">
            <div className="grid gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-4 sm:p-6">
                        <CardHeader className="p-0 pb-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6" />
                            <div className="flex justify-end mt-4">
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}