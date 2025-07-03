'use client'
import React, { useEffect, useState } from 'react';
import { API } from '@/lib/data-service';
import Header from '@/components/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { findCategoryHierarchy, getAvailableProviders } from '@/redux/slices/serviceProvider';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

async function getCategoryData(name) {
    const res = await fetch(`${API}/api/category/getCategoryByName/${name}`);
    return res.ok ? res.json() : null;
}

const CustomNotFound = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <div className="text-center max-w-2xl">
            <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Service Not Found</h2>
            <p className="text-xl text-gray-300 mb-8">
                The service you're looking for doesn't exist or may have been moved.
            </p>
            <a
                href="/"
                className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 inline-block"
            >
                Return Home
            </a>
        </div>
    </div>
);


const BookingDialog = ({ triggerText, categoryName }) => {
    const [zipCode, setZipCode] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setIsLoading] = useState(true)

    const handleContinue = async () => {

        if (zipCode && categoryName) {
            try {
                const providersResponse = await dispatch(getAvailableProviders({
                    postalCode: zipCode,
                    category: categoryName
                }));
                const categoryHierarchyResponse = await dispatch(findCategoryHierarchy(categoryName));

                const availableProviders = providersResponse.payload;
                const categoryHierarchy = categoryHierarchyResponse.payload;

                if (availableProviders && categoryHierarchy) {
                    try {
                        localStorage.setItem('availableProviders', JSON.stringify(availableProviders));
                        localStorage.setItem('categoryHierarchy', JSON.stringify(categoryHierarchy));
                    } catch (err) {
                        console.error("Error saving data to localStorage", err);
                    }
                }
                router.push("/service-request");
            } catch (err) {
                toast.error('Error fetching service providers', {
                    position: 'top-center',
                    duration: 3000,
                    style: { color: "red" }
                });
            } finally {
                setIsLoading(false)
            }
        } else {
            toast.error('Zip code is required', {
                position: 'top-center',
                duration: 3000,
                style: { color: "red" }
            });
            setIsLoading(false)
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-700 cursor-pointer hover:bg-green-600 text-white font-bold py-6 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-700/30 animate-pulse-slow">
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Book Your Service</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="zipcode" className="text-right">
                            Zip Code
                        </Label>
                        <Input
                            id="zipcode"
                            type="text"
                            placeholder="Enter your zip code"
                            className="col-span-3"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            type="button"
                            className="bg-green-700 cursor-pointer hover:bg-green-600"
                            disabled={!zipCode.trim() || !loading}
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Service = ({ name }) => {
    const [category, setCategory] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch(`${API}/api/category/getCategoryByName/${name}`);
                if (!res.ok) {
                    setNotFound(true);
                } else {
                    const data = await res.json();
                    setCategory(data);
                }
            } catch (err) {
                console.error('Failed to fetch category:', err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        if (name) fetchCategory();
    }, [name]);

    if (loading) {
        return <Skeleton className="w-full h-screen" />;
    }

    if (notFound || !category) {
        return <CustomNotFound />;
    }

    return (
        <>
            <Header />
            <Toaster position='bottom-left' richColors />
            <div className="min-h-screen text-gray-100">
                {/* Hero Section */}
                <div className="relative h-[90vh] w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${category.servicePicture})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
                    <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-600 drop-shadow-lg">
                            {category.name}
                        </h1>
                        <p className="text-xl md:text-3xl max-w-2xl text-gray-200 font-medium mb-8">
                            Professional {category.name} Services
                        </p>
                        <BookingDialog triggerText="Get Started" categoryName={name} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12 max-w-6xl">
                    {/* Description */}
                    <section className="mb-16">
                        <h2 className='text-black text-3xl font-bold pb-6 border-b border-green-700/30'>Service Overview</h2>
                        <div className="prose prose-invert max-w-none mt-8">
                            <div
                                className="text-lg leading-relaxed text-black space-y-4"
                                dangerouslySetInnerHTML={{ __html: category.description }}
                            />
                        </div>
                    </section>

                    {/* Features and Pricing */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
                        <div className="h-full bg-gray-200 p-8 rounded-xl border border-green-700/20 shadow-lg">
                            <h3 className="text-2xl font-bold text-green-600 mb-6">Why Choose Us</h3>
                            <ul className="space-y-4">
                                {[
                                    "Licensed and insured professionals",
                                    "Same-day service available",
                                    "Transparent pricing",
                                    "Satisfaction guaranteed"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green-500 text-2xl mr-3">✓</span>
                                        <span className="text-black text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="h-full bg-gray-200 rounded-xl p-8 border border-green-700/30 shadow-lg flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-green-600 mb-2">Pricing</h2>
                                <p className="text-4xl font-bold text-black mb-2">{category.estimatedPrice}</p>
                                <p className="text-gray-500">Flexible pricing based on your needs</p>
                            </div>
                            <BookingDialog triggerText="Book Now" categoryName={name} />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Service;