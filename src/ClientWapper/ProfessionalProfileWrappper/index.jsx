'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/lib/data-service";

import { Rating, ThinStar } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import {
    // Avatar, AvatarFallback, AvatarImage,
    // Badge,
    // Button,
    // Card, CardContent, CardHeader, CardTitle,
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
    // Input,
    // Progress,
    // Textarea
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";

import {
    Star, MapPin, Phone,
    AlertCircle, CheckCircle2, XCircle, PauseCircle,
    Loader2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfessionalProfile({ name }) {
    // State management
    const [professional, setProfessional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reviewData, setReviewData] = useState({
        name: '',
        email: '',
        rating: 0,
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch professional data
    useEffect(() => {
        const fetchProfessional = async () => {
            try {
                const response = await axios.get(`${API}/api/service-provider/getProfessionalbyName/${name}`);
                if (response.status !== 200) throw new Error('Professional not found');
                setProfessional(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessional();
    }, [name]);

    // Handle review submission
    const handleReviewSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API}/api/service-provider/add-provider-review/${professional._id}`, {
                ...reviewData
            });

            if (response.status === 201) {
                // Refresh professional data
                const updatedResponse = await axios.get(`${API}/api/service-provider/getProfessionalbyName/${name}`);
                setProfessional(updatedResponse.data.data);
                setReviewData({ name: '', email: '', rating: 0, description: '' });
                setIsDialogOpen(false);
            }
        } catch (err) {
            console.error("Error submitting review:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate average rating
    const avgRating = professional?.reviews?.length > 0
        ? professional.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / professional.reviews.length
        : 0;

    // Loading state
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-green-700" />
            <p className="mt-4 text-green-700 font-medium">Loading professional profile...</p>
        </div>
    );

    // Error state
    if (error) return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <Card className="border-green-200 bg-green-50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-green-700" />
                        <CardTitle className="text-green-700">Profile Not Found</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-green-700">The professional you're looking for doesn't exist.</p>
                </CardContent>
            </Card>
        </div>
    );

    // Not found state
    if (!professional) return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <Card className="border-green-200 bg-green-50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-green-700" />
                        <CardTitle className="text-green-700">Profile Not Found</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-green-700">The professional you're looking for doesn't exist.</p>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-shrink-0">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-green-700">
                        <AvatarImage src={API + professional?.profilePicture} />
                        <AvatarFallback className="bg-green-100 text-green-800 text-4xl font-bold">
                            {(professional?.name?.charAt(0) || 'P').toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{professional?.name || 'Professional'}</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1 font-medium">{avgRating.toFixed(1)}</span>
                                    <span className="text-muted-foreground ml-1">
                                        ({professional?.reviews?.length || 0} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {[professional?.city, professional?.state, professional?.country].filter(Boolean).join(', ') || 'Location not specified'}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {professional?.status === 'approved' && !professional?.onHold ? (
                                <Badge className="gap-1 bg-green-100 text-green-800 hover:bg-green-100">
                                    <CheckCircle2 className="w-4 h-4 text-green-700" /> Approved
                                </Badge>
                            ) : professional?.onHold ? (
                                <Badge className="gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                    <PauseCircle className="w-4 h-4 text-yellow-700" /> On Hold
                                </Badge>
                            ) : professional?.status === 'pending' ? (
                                <Badge className="gap-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                                    <AlertCircle className="w-4 h-4 text-blue-700" /> Pending Approval
                                </Badge>
                            ) : (
                                <Badge className="gap-1 bg-red-100 text-red-800 hover:bg-red-100">
                                    <XCircle className="w-4 h-4 text-red-700" /> Rejected
                                </Badge>
                            )}
                        </div>
                    </div>

                    {professional?.about && (
                        <p className="mt-4 text-gray-600">{professional.about}</p>
                    )}

                    {/* <div className="mt-4 flex flex-wrap gap-4">
                        {professional?.contactInfo && (
                            <div className="flex items-center gap-2 text-gray-700">
                                <Phone className="w-4 h-4 text-green-700" />
                                <span>{professional.contactInfo}</span>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>

            {/* Services Section */}
            {professional?.selectedCategories?.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-green-800">Services Offered</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {professional.selectedCategories.map((category, index) => (
                                <Card key={index} className="p-4 border-green-100 hover:border-green-200 transition-colors">
                                    <h3 className="font-medium mb-2 text-green-800">{category?.category || 'Uncategorized'}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Service radius: {category?.serviceRadius || 0} miles around {category?.postalCode || 'unknown location'}
                                    </p>
                                    <div className="space-y-2">
                                        {category?.subcategories?.map((subcat, subIndex) => (
                                            <div key={subIndex}>
                                                <p className="font-medium text-sm text-green-700">{subcat?.subcategory || 'General'}</p>
                                                {subcat?.subSubcategories?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {subcat.subSubcategories.map((subSub, ssIndex) => (
                                                            <Badge
                                                                key={ssIndex}
                                                                variant="outline"
                                                                className="text-xs border-green-200 text-green-700 bg-green-50"
                                                            >
                                                                {subSub || 'Service'}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reviews Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-green-800">Customer Reviews</CardTitle>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="font-medium">{avgRating.toFixed(1)} out of 5</span>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-green-700 hover:bg-green-800">
                                        Add Review
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-green-800">Add Your Review</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Your Name
                                            </label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                value={reviewData.name}
                                                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                Your Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={reviewData.email}
                                                onChange={(e) => setReviewData({ ...reviewData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Your Rating
                                            </label>
                                            <Rating
                                                style={{ maxWidth: 150 }}
                                                value={reviewData.rating}
                                                onChange={(rating) => setReviewData({ ...reviewData, rating })}
                                                itemStyles={{
                                                    itemShapes: ThinStar,
                                                    activeFillColor: '#15803d', // green-700
                                                    inactiveFillColor: '#D7D7D7', // green-100
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                                Your Review
                                            </label>
                                            <Textarea
                                                id="description"
                                                placeholder="Share your experience..."
                                                rows={4}
                                                value={reviewData.description}
                                                onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        className="bg-green-700 hover:bg-green-800"
                                        onClick={handleReviewSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : 'Submit Review'}
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Rating Breakdown */}
                    <div className="mb-6">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = professional?.reviews?.filter(r => r?.rating === star).length || 0;
                            const percentage = professional?.reviews?.length
                                ? (count / professional.reviews.length) * 100
                                : 0;

                            return (
                                <div key={star} className="flex items-center gap-4 mb-2">
                                    <div className="flex items-center w-16">
                                        <span className="w-4">{star}</span>
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-1" />
                                    </div>
                                    <Progress value={percentage} className="h-2 flex-1 bg-green-100" indicatorClassName="bg-green-700" />
                                    <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {professional?.reviews?.length > 0 ? (
                            professional.reviews.map((review, index) => (
                                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{review?.name || 'Anonymous'}</h4>
                                            <p className="text-sm text-gray-500">
                                                {review?.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'Date unknown'}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="ml-1 font-medium">{review?.rating || 0}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review?.description || 'No description provided'}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}