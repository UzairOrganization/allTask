'use client'

import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';


const StageFive = ({ Toaster, formData, setFormData, back, onSubmit, componentLoading }) => {
    const {
        customerDetails = {},
        photos = [],
        serviceProvider = [],
        ...serviceDetails
    } = formData;

    // Format keys to be more readable (optional)
    const formatKey = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/Id|Url|Zip/g, match => match.toUpperCase());
    };

    return (
        <>
            <Toaster />
            <div className="max-w-4xl mx-auto p-4">
                <div className="text-center mb-8">
                    <CheckCircle2 className="h-12 w-12 text-[#00725A] mx-auto mb-3" />
                    <h1 className="text-2xl font-bold text-gray-900">Review Your Request</h1>
                    <p className="text-gray-600 mt-2">Please confirm all details before submitting</p>
                </div>

                <div className="space-y-6">
                    {/* Service Details - Dynamically rendered */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b">
                            <h2 className="font-semibold text-gray-800">
                                Service Details
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(serviceDetails)
                                .filter(([key]) => key !== "files" && key !== "customer")
                                .map(([key, value]) => (
                                    <div key={key} className="p-4 rounded-lg bg-gray-50">
                                        <h3 className="text-sm font-medium text-gray-500">
                                            {formatKey(key)}
                                        </h3>
                                        <p className="text-gray-900 font-medium">
                                            {value?.toString() || 'Not specified'}
                                        </p>
                                    </div>
                                ))}
                        </div>

                    </div>

                    {/* Photos */}
                    {photos.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b">
                                <h2 className="font-semibold text-gray-800">
                                    Attached Photos ({photos.length})
                                </h2>
                            </div>
                            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {photos.map((photo, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                                        <Image
                                            src={photo.preview || photo.url}
                                            alt={`Photo ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Customer Info - Dynamically rendered */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b">
                            <h2 className="font-semibold text-gray-800">
                                Customer Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(customerDetails).map(([key, value]) => (
                                <div key={key} className="p-4 rounded-lg bg-gray-50">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        {formatKey(key)}
                                    </h3>
                                    <p className="text-gray-900 font-medium">
                                        {value?.toString() || 'Not specified'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                        <Button
                            type="button"
                            onClick={back}
                            variant="outline"
                            className="px-8 py-3 text-base"
                        >
                            Back
                        </Button>
                        <Button
                            type="button"
                            onClick={onSubmit}
                            className="px-8 py-3 text-base bg-[#00725A] hover:bg-[#00634A]"
                            disabled={componentLoading}
                        >
                            {componentLoading ? "Loading..." : "Confirm & Submit Request"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StageFive;