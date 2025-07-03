"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { API } from '@/lib/data-service';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';




export function ProfessionalEstimations() {
    const [estimations, setEstimations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const professionalName = params.name; // Assuming you have name in params

    useEffect(() => {
        const fetchEstimations = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${API}/api/cost-estimator/by-provider-name/${professionalName}`,
                    { withCredentials: true }
                );

                setEstimations(response.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.response?.data?.error || "Failed to load estimations");
                toast.error("Failed to fetch professional estimations");
            } finally {
                setLoading(false);
            }
        };

        if (professionalName) {
            fetchEstimations();
        }
    }, [professionalName, toast]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Card className="border-red-500">
                <CardHeader>
                    <CardTitle className="text-red-500">Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{error}</p>
                </CardContent>
            </Card>
        );
    }

    if (estimations.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Estimations Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This professional hasn't created any service estimations yet.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {estimations.map((estimation) => (
                <Card key={estimation._id} className="border-green-700">
                    <CardHeader>
                        <CardTitle className="text-green-700 flex items-center justify-between">
                            {estimation.service}
                            {/* <Badge variant="outline" className="text-green-700 border-green-700">
                                {new Date(estimation.createdAt).toLocaleDateString()}
                            </Badge> */}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {estimation.subServices.map((subService, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <span className="font-medium">{subService.name}</span>
                                    <Badge className="bg-green-700 hover:bg-green-800">
                                        {subService.estimatedCost}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}