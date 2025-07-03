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


export default function Page() {

    const { provider } = useSelector(state => state.auth);
    const [forums, setForums] = useState([])
    const [providerForums, setProviderForums] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()
    // const forums = await getForums();
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

            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Community Forum</h1>
                    <div className="flex gap-4">
                        <Input placeholder="Search forums..." className="w-64" />
                        <Link href="/forums/new-forum" className="cursor-pointer">
                            <Button className="cursor-pointer">Start Discussion</Button>
                        </Link>
                    </div>
                </div>
                <div className="container mx-auto my-8">
                    <Tabs defaultValue="All Discussions">
                        <div className="flex justify-end my-4">

                            <TabsList>
                                <TabsTrigger value="All Discussions">All Discussions</TabsTrigger>
                                <TabsTrigger value="Your Discussions">Your Discussions</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="All Discussions" className="my-10">
                            {loading ? (
                                <ForumSkeleton />
                            ) : (
                                <div className="grid gap-6">
                                    {forums.length === 0 && (
                                        <Card>
                                            <CardContent className="py-6 text-center">
                                                <p>No forum posts yet. Be the first to start a discussion!</p>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {forums.map((forum) => (
                                        <Link key={forum._id} href={`/forums/${forum._id}`}>
                                            <Card className="hover:shadow-lg transition-shadow">
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <CardTitle>{forum.title}</CardTitle>
                                                            <CardDescription className="mt-2">
                                                                {forum.tag && (
                                                                    <span className="inline-block bg-green-100 dark:bg-green-800 rounded-full px-3 py-1 text-sm font-medium mr-2">
                                                                        {forum.tag}
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    Posted {formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}
                                                                </span>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                                                        {forum.content.slice(0, 500)}...
                                                    </p>
                                                    <div className="w-full my-4 flex justify-end">
                                                        <Button className="bg-green-700 cursor-pointer" onClick={() => router.push(`/${forum._id}}`)}>
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
                        <TabsContent value="Your Discussions" className="my-10">
                            {loading ? (
                                <ForumSkeleton />
                            ) : (
                                <div className="grid gap-6">
                                    {providerForums.length === 0 ? (
                                        <Card>
                                            <CardContent className="py-6 text-center">
                                                <p>No forum posts yet. Be the first to start a discussion!</p>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        providerForums.map((forum) => (
                                            <Link key={forum._id} href={`/forums/${forum._id}`}>
                                                <Card className="hover:shadow-lg transition-shadow">
                                                    <CardHeader>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <CardTitle>{forum.title}</CardTitle>
                                                                <CardDescription className="mt-2">
                                                                    {forum.tag && (
                                                                        <span className="inline-block bg-green-100 dark:bg-green-800 rounded-full px-3 py-1 text-sm font-medium mr-2">
                                                                            {forum.tag}
                                                                        </span>
                                                                    )}
                                                                    <span>
                                                                        Posted {formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}
                                                                    </span>
                                                                </CardDescription>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                                                            {forum.content.slice(0, 500)}...
                                                        </p>
                                                        <div className="w-full my-4 flex justify-end">
                                                            <Button className="bg-green-700 cursor-pointer" onClick={() => router.push(`/${forum._id}}`)}>
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
        <div className="container mx-auto py-8">

            <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6 mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}