"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { API } from '@/lib/data-service';
import ProfessionalHeader from '@/components/Professionals/ProfessionalHeader';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

export default function ServiceSelectionForm() {
    const [service, setService] = useState(null);
    const [subServices, setSubServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [existingEstimation, setExistingEstimation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const params = useParams();
    const serviceName = params.service;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch service data and estimation in parallel
                const [serviceResponse, estimationResponse] = await Promise.all([
                    fetch(`${API}/api/services/services/${serviceName}`).then(res => {
                        if (!res.ok) throw new Error('Service not found');
                        return res.json();
                    }),
                    axios.get(
                        `${API}/api/cost-estimator/getEstimationByServiceNameAndProfessionalsId/${serviceName}`,
                        { withCredentials: true }
                    ).catch(err => {
                        // Handle 404 as no existing estimation (not an error case)
                        if (err.response?.status === 404) return { data: null };
                        throw err;
                    })
                ]);

                setService(serviceResponse);

                if (estimationResponse.data) {
                    setExistingEstimation(estimationResponse.data);
                    // Create a map of existing subservices for quick lookup
                    const existingSubServicesMap = new Map(
                        estimationResponse.data.subServices.map(item => [item.name, item])
                    );

                    setSubServices(
                        serviceResponse.subServices.map(sub => ({
                            name: sub,
                            estimatedCost: existingSubServicesMap.get(sub)?.estimatedCost || '',
                            selected: existingSubServicesMap.has(sub)
                        }))
                    );
                } else {
                    setSubServices(
                        serviceResponse.subServices.map(sub => ({
                            name: sub,
                            estimatedCost: '',
                            selected: false
                        }))
                    );
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (serviceName) {
            fetchData();
        }
    }, [serviceName]);

    const handleCheckboxChange = (index) => {
        const updatedSubServices = [...subServices];
        updatedSubServices[index].selected = !updatedSubServices[index].selected;
        setSubServices(updatedSubServices);
    };

    const handleCostChange = (index, value) => {
        const updatedSubServices = [...subServices];
        updatedSubServices[index].estimatedCost = value;
        setSubServices(updatedSubServices);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const selectedServices = subServices
                .filter(sub => sub.selected && sub.estimatedCost)
                .map(({ name, estimatedCost }) => ({ name, estimatedCost }));

            if (existingEstimation) {
                // Update existing estimation
                await axios.put(
                    `${API}/api/cost-estimator/updateEstimation/${existingEstimation._id}`,
                    { subServices: selectedServices },
                    { withCredentials: true }
                );
                toast.success("Estimation updated successfully!");
            } else {
                // Create new estimation
                await axios.post(
                    `${API}/api/cost-estimator`,
                    { service: serviceName, subServices: selectedServices },
                    { withCredentials: true }
                );
                toast.success("Estimation submitted successfully!");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit estimation");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-green-700" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md border-green-700">
                    <CardHeader>
                        <CardTitle className="text-green-700">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-500">{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <ProfessionalHeader />
            <Toaster position='bottom-left' richColors />
            <div className="min-h-screen text-white p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-green-700 mb-8">
                        <CardHeader>
                            <CardTitle className="text-green-700 text-2xl md:text-3xl">
                                {service?.name} Service Estimation
                            </CardTitle>
                            <p className="text-black">
                                Select the subservices you can provide and enter your estimated cost range.
                            </p>
                        </CardHeader>
                    </Card>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {subServices.map((subService, index) => (
                                <Card
                                    key={index}
                                    className={`border-2 transition-all ${subService.selected ? 'border-green-700' : 'border-gray-400 hover:border-gray-300'}`}
                                >
                                    <CardContent className="p-4 flex flex-col space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`subservice-${index}`}
                                                checked={subService.selected}
                                                onCheckedChange={() => handleCheckboxChange(index)}
                                                className="h-5 w-5 border-gray-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
                                            />
                                            <Label
                                                htmlFor={`subservice-${index}`}
                                                className="text-lg font-medium cursor-pointer"
                                            >
                                                {subService.name}
                                            </Label>
                                        </div>

                                        {subService.selected && (
                                            <div className="flex flex-col gap-2 ">
                                                <Label htmlFor={`cost-${index}`} className="text-black">
                                                    Estimated Range:
                                                </Label>
                                                <Input
                                                    id={`cost-${index}`}
                                                    type="text"
                                                    placeholder="$100-$200"
                                                    value={subService.estimatedCost}
                                                    onChange={(e) => handleCostChange(index, e.target.value)}
                                                    className="border-gray-700 text-black focus:ring-green-700 focus:border-green-700"
                                                    required
                                                />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting || !subServices.some(sub => sub.selected)}
                                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Estimation"
                                )}
                            </Button>
                        </div>
                    </form>

                    {subServices.some(sub => sub.selected) && (
                        <Card className="border-green-700 mt-8 sticky bottom-4">
                            <CardHeader>
                                <CardTitle className="text-green-700">Selected Services</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {subServices
                                        .filter(sub => sub.selected)
                                        .map((sub, idx) => (
                                            <div key={idx} className="flex justify-between items-center">
                                                <Badge variant="outline" className="border-green-700 text-green-700">
                                                    {sub.name}
                                                </Badge>
                                                <span className="font-medium">
                                                    {sub.estimatedCost || 'Not specified'}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}