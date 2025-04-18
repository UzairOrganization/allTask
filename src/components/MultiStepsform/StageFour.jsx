'use client'

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Check, Star, MapPin, Phone, Mail, User, ZapIcon, Frown, Search } from 'lucide-react';
import Image from 'next/image';

const StageFour = ({ finalFormData, formData, setFormData, next, back }) => {
    const [availableProviders, setAvailableProviders] = useState([]);
    const [selectedProviders, setSelectedProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noProvidersFound, setNoProvidersFound] = useState(false);

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
            try {
                // Load providers from localStorage with enhanced data
                const providers = JSON.parse(localStorage.getItem('availableProviders')) || [];

                if (providers.length === 0) {
                    setNoProvidersFound(true);
                } else {
                    // Enhance providers with calculated ratings
                    const enhancedProviders = providers.map(provider => {
                        const reviews = provider.reviews || [];
                        const ratingCount = reviews.length;
                        const sumRating = reviews.reduce((total, review) => total + (review.rating || 0), 0);
                        const averageRating = ratingCount > 0 ? (sumRating / ratingCount).toFixed(1) : '0.0';

                        return {
                            ...provider,
                            rating: averageRating,
                            reviewCount: ratingCount
                        };
                    });

                    setAvailableProviders(enhancedProviders);
                }
            } catch (error) {
                console.error("Error loading providers from localStorage:", error);
                setNoProvidersFound(true);
            }
        }

        setLoading(false);
    }, []);

    const toggleProviderSelection = (provider) => {
        setSelectedProviders(prev => {
            const isSelected = prev.some(p => p.email === provider.email);
            if (isSelected) {
                return prev.filter(p => p.email !== provider.email);
            } else {
                return [...prev, provider];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Only add serviceProvider to formData and finalFormData if providers are selected
        if (selectedProviders.length > 0) {
            setFormData({ serviceProvider: selectedProviders.map(p => p._id) });
            finalFormData.append("serviceProvider", selectedProviders.map(p => p._id));
        } else {
            // If no providers selected, just update formData with empty array
            setFormData({ serviceProvider: [] });
            // Don't append anything to finalFormData
        }

        next();
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-4 md:p-6">
                <Card className="shadow-lg overflow-hidden border border-gray-100">
                    <CardHeader className="bg-[#00725A] p-4">
                        <h2 className="text-lg md:text-xl font-semibold text-white">
                            Loading Service Professionals...
                        </h2>
                    </CardHeader>
                    <CardContent className="p-8 text-center">
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (noProvidersFound) {
        return (
            <div className="max-w-6xl mx-auto p-4 md:p-6">
                <Card className="shadow-lg overflow-hidden border border-gray-100">
                    <CardHeader className="bg-[#00725A] p-4">
                        <h2 className="text-lg md:text-xl font-semibold text-white">
                            Select Service Professionals
                        </h2>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="text-center py-12 space-y-6">
                            <div className="inline-flex items-center justify-center bg-[#00725A]/10 p-4 rounded-full">
                                <Frown className="h-12 w-12 text-[#00725A]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                No Available Professionals Found
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                We couldn't find any service professionals working in your area for this specific service.
                                Don't worry, we'll try our best to find the perfect match for you.
                            </p>
                            <div className="flex justify-between pt-6 max-w-md mx-auto">
                                <Button
                                    type="button"
                                    onClick={back}
                                    variant="outline"
                                    className="px-6 py-3 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={next}
                                    className="px-6 py-3 text-base bg-[#00725A] hover:bg-[#00634A] text-white"
                                >

                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <Card className="shadow-lg overflow-hidden border border-gray-100">
                <CardHeader className="bg-[#00725A] p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                        Select Service Professionals
                    </h2>
                    <p className="text-sm text-white/90 mt-1">
                        {selectedProviders.length > 0
                            ? `${selectedProviders.length} selected`
                            : 'Choose one or more professionals'}
                    </p>
                </CardHeader>
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {availableProviders.map((provider, index) => (
                                <div
                                    key={index}
                                    className={`relative border rounded-lg p-6 transition-all cursor-pointer hover:shadow-md ${selectedProviders.some(p => p.email === provider.email)
                                        ? 'border-[#00725A] ring-2 ring-[#00725A]/20 bg-[#00725A]/5'
                                        : 'border-gray-200 hover:border-[#00725A]/50'
                                        }`}
                                    onClick={() => toggleProviderSelection(provider)}
                                >
                                    {/* Selection indicator */}
                                    {selectedProviders.some(p => p.email === provider.email) && (
                                        <div className="absolute top-4 right-4 bg-[#00725A] text-white p-1.5 rounded-full">
                                            <Check className="h-4 w-4" />
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        {/* Profile Image */}
                                        <div className="flex-shrink-0">
                                            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#00725A]/30">
                                                <Image
                                                    src={provider.profilePicture || '/placeholder-user.jpg'}
                                                    alt={provider.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="96px"
                                                />
                                            </div>
                                        </div>

                                        {/* Provider Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
                                                    <div className="flex items-center mt-1">
                                                        <div className="flex items-center bg-[#00725A]/10 px-2 py-1 rounded">
                                                            <Star className="h-4 w-4 fill-[#00725A] text-[#00725A]" />
                                                            <span className="ml-1 font-medium text-[#00725A]">
                                                                {provider.rating || 'New'}
                                                            </span>
                                                            {provider.reviewCount > 0 && (
                                                                <span className="ml-2 text-sm text-gray-600">
                                                                    ({provider.reviewCount} reviews)
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <MapPin className="h-4 w-4 mr-2 text-[#00725A]" />
                                                        <span>{provider.city}, {provider.country}</span>
                                                    </div>
                                                    {provider.postalCode && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            {/* <ZapIcon className="h-4 w-4 mr-2 text-[#00725A]" /> */}
                                                            <span>{provider.postalCode}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {provider.about && (
                                                <p className="mt-4 text-gray-600">
                                                    {provider.about}
                                                </p>
                                            )}

                                            {/* Skills/Services */}
                                            {provider.skills && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {provider.skills.map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 text-xs font-medium rounded-full bg-[#00725A]/10 text-[#00725A]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between pt-6">
                            <Button
                                type="button"
                                onClick={back}
                                variant="outline"
                                className="px-6 py-3 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                disabled={selectedProviders.length === 0}
                                className="px-6 py-3 text-base bg-[#00725A] hover:bg-[#00634A] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {selectedProviders.length > 1
                                    ? `Continue with ${selectedProviders.length} professionals`
                                    : selectedProviders.length === 1
                                        ? 'Continue with selected professional'
                                        : 'Continue'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default StageFour;