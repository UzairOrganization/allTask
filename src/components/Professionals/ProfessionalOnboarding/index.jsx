'use client'
import * as React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ToggleLeft, ToggleRight } from "lucide-react";
import { CheckCircle, ChevronRight, Edit, Info, Crown, User, Upload, X, ClockIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServicesContainer } from "./ServiceContainer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { API } from "@/lib/data-service";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { checkProviderAuthStatus } from "@/redux/slices/authSlice";
import PDFUpload from "@/components/PDFUpload/PDFUpload";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51RJj3ZCkhStwG9g0TqEdDFkjXh56MvomnCibFbf1ijemDQ1TkHwjsb5oJ2AG3ePLAi8Np9FLNZsmz4N2CA4sKEhn00vHNOmlYC");
// FileUpload component
const FileUpload = ({ onFileUpload, accept, uploading }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            onFileUpload(selectedFile);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {previewUrl ? (
                <div className="relative">
                    {file.type.startsWith('image/') ? (
                        <img src={previewUrl} alt="Preview" className="h-40 mx-auto mb-4 rounded-md" />
                    ) : (
                        <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                            <span className="text-gray-500">{file.name}</span>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-sm"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4 text-gray-500" />
                    </Button>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <Label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                                <span>Upload a file</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    accept={accept}
                                    disabled={uploading}
                                />
                            </Label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">{accept}</p>
                    </div>
                </>
            )}
            {uploading && (
                <div className="mt-4">
                    <Progress value={50} className="h-2" />
                    <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                </div>
            )}
        </div>
    );
};

export function ProfessionalOnboarding() {
    const [dateTime, setDateTime] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { provider } = useSelector(state => state.auth);
    const [profileUpdating, setProfileUpdateing] = useState(false)
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [activityStatus, setActivityStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [profilePictureUploading, setProfilePictureUploading] = useState(false);
    const dispatch = useDispatch()
    // Form state
    const [formData, setFormData] = useState({
        name: provider?.name || "",
        email: provider?.email || "",
        about: provider?.about || "",
        contactInfo: provider?.contactInfo || "",
        country: provider?.country || "",
        state: provider?.state || "",
        city: provider?.city || "",
        postalCode: provider?.postalCode || "",
        verificationDocument: provider?.verificationDocument || null,
        status: provider?.status
    });
    const handlePaymentSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setPaymentError(null);

        try {
            // 1. Initiate checkout session
            const response = await axios.post(`${API}/api/payments/initiate-professional-plus`, {},
                { withCredentials: true }
            );

            // 2. Redirect to Stripe Checkout using Stripe.js
            const { error } = (await stripePromise).redirectToCheckout({
                sessionId: response.data.sessionId
            });

            if (error) {
                throw error;
            }
            setPaymentProcessing(false);
        } catch (err) {
            setPaymentError(err.response?.data?.error || err.message);
            setPaymentProcessing(false);
        } finally {
            setPaymentProcessing(false);
        }
    };

    const [documentUploading, setDocumentUploading] = useState(false);
    const [rejectionReason, setRejectionReason] = useState(provider?.reasonOfRejection || "");
    const [holdReason, setHoldReason] = useState(provider?.resaonOfHold || "");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const dayName = now.toLocaleString("en-US", { weekday: "long" });
            const day = now.getDate();
            const month = now.toLocaleString("en-US", { month: "short" });

            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const ampm = hours >= 12 ? " pm" : " am";

            hours = hours % 12 || 12;

            // Updated to US format: Month–Day
            setDateTime(`${dayName}, ${month} ${day} ${hours}:${minutes}${ampm}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (provider) {
            setFormData({
                name: provider.name || "",
                email: provider.email || "",
                about: provider.about || "",
                contactInfo: provider.contactInfo || "",
                country: provider.country || "",
                state: provider.state || "",
                city: provider.city || "",
                postalCode: provider.postalCode || "",
                verificationDocument: provider.verificationDocument || null,
            });
            setRejectionReason(provider.reasonOfRejection || "");
            setHoldReason(provider.resaonOfHold || "");
            setActivityStatus(provider.activityStatus);
            setIsLoading(false);
        }
    }, [provider]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDocumentUpload = async (file) => {
        setDocumentUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${API}/api/service-provider/verification-documents/${provider._id}`, formData, { withCredentials: true });

            if (response.status === 200) {
                setFormData(prev => ({
                    ...prev,
                    verificationDocument: response?.data.provider.verificationDocument,
                    status: 'pending'
                }));
                toast.success("Document Uploaded Successfully", {
                    description: "Your Verification Document has been successfully uploaded",
                    duration: 3000,
                    position: "bottom-left",
                })
            } else {
                throw new Error('Upload failed');

            }
        } catch (error) {
            console.error('Error uploading document:', error);
            toast.error("Error Uploading Documents", {
                description: "Something went wrong!",
                duration: 3000,
                position: "bottom-left",
            })
            // Show error toast/notification
        } finally {
            setDocumentUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProfileUpdateing(true)
        try {
            const response = await axios.put(`${API}/api/service-provider/update-provider-profile`, { about: formData.about }, { withCredentials: true });

            if (response.status === 200) {
                setFormData(prev => ({
                    ...prev,
                    about: response?.data.provider.about,
                    status: 'pending'
                }));
                toast.success("Profile Updated Successfully!", {
                    description: "Your Profile has been updated.",
                    duration: 3000,
                    position: "bottom-left",
                })
            } else {
                throw new Error('update failed');

            }
        } catch (error) {
            console.error('Error uploading document:', error);
            toast.error("Error Updating Profile!", {
                description: "Something went wrong. Try again later.",
                duration: 3000,
                position: "bottom-left",
            })
            // Show error toast/notification
        } finally {
            setIsDialogOpen(false);
            setProfileUpdateing(false);
        }
    };
    const handleStatusToggle = async () => {
        const newStatus = !activityStatus;
        setUpdatingStatus(true);
        try {
            const response = await axios.put(
                `${API}/api/service-provider/update-activity-status`,
                { activityStatus: newStatus },
                { withCredentials: true }
            );

            if (response.data.success) {
                setActivityStatus(newStatus);
                toast.success(`You're now ${newStatus ? 'online' : 'offline'}`, {
                    description: `Your profile is now ${newStatus ? 'visible' : 'hidden'} to clients`,
                    duration: 3000,
                    position: "bottom-left",
                });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error("Failed to update status", {
                description: error.response?.data?.message || "Please try again later",
                duration: 3000,
                position: "bottom-left",
            });
        } finally {
            setUpdatingStatus(false);
        }
    };
    return (
        <>

            <Toaster />
            <div className="w-full my-4 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm">
                <div className="flex w-full items-center justify-between">

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Hello, {provider?.name}</h1>
                        <p className="text-gray-500">{dateTime}</p>
                    </div>
                    <div className="flex items-center w-[200px] justify-around">
                        <div className="flex items-center gap-2">
                            {isLoading ? (
                                // Loading state
                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                            ) : activityStatus ? (
                                // Online state
                                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                            ) : (
                                // Offline state
                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                            )}
                            <span className="text-sm font-medium">
                                {isLoading ? 'Loading...' : activityStatus ? 'Online' : 'Offline'}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={handleStatusToggle}
                            disabled={updatingStatus || isLoading}
                        >
                            {isLoading ? (
                                // Loading state for button
                                <span>Loading...</span>
                            ) : activityStatus ? (
                                // Online button state
                                <>
                                    <ToggleLeft className="h-4 w-4" />
                                    <span>Go Offline</span>
                                </>
                            ) : (
                                // Offline button state
                                <>
                                    <ToggleRight className="h-4 w-4 text-green-600" />
                                    <span>Go Online</span>
                                </>
                            )}
                            {updatingStatus && (
                                <span className="ml-2">
                                    <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            )}
                        </Button>
                    </div>


                </div>
                <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-lg font-medium text-green-800 mb-2">Welcome to Our Platform, {provider?.name}</h3>
                    <p className="text-green-700">
                        We're excited to help you grow your business. Here's how it works:
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-left font-medium">1. Customers tell us what they need</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 text-gray-600">
                            Customers answer specific questions about their requirements, helping us match you with the most relevant opportunities.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-left font-medium">2. We send you matching leads</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 text-gray-600">
                            You receive leads that match your preferences instantly by email and on the app, so you never miss an opportunity.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-left font-medium">3. You choose leads you like</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 text-gray-600">
                            Review leads and select those that fit your business. Get customer contact details right away for the leads you choose.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-left font-medium">4. You contact the customer</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 text-gray-600">
                            Reach out directly to the customer to discuss their needs and provide your services. Build your client base with qualified leads.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-left font-medium">5. You get hired.</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 text-gray-600">
                            There's no commission and nothing more to pay.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Overview</h1>
                    <div className={`grid grid-cols-1  ${provider?.isSubscriptionHolder ? "lg:grid-cols-1" : "lg:grid-cols-2"} gap-6 items-stretch`}>
                        {/* Profile Completion Card */}
                        <Card className="border  border-gray-200 rounded-lg shadow-sm h-full flex flex-col">
                            <CardHeader className="border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    {provider?.profilePicture ? (
                                        <img
                                            src={provider.profilePicture}
                                            alt="Profile"
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="h-6 w-6 text-gray-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {provider?.name || "Your Profile"}
                                        </h2>
                                        <p className="text-sm text-gray-500">Service Professional</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <div className="space-y-4 h-full flex flex-col">

                                    <p className="text-gray-700 flex-grow">
                                        Completing your profile increases your visibility and helps you get more clients.
                                    </p>

                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="border-green-700 text-green-700 mt-auto w-full"
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Complete Profile
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Complete Your Profile</DialogTitle>
                                            </DialogHeader>

                                            <form className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label>Profile Picture</Label>
                                                        <div className="flex items-center gap-6">
                                                            <div className="relative">
                                                                {provider?.profilePicture ? (
                                                                    <img
                                                                        src={provider.profilePicture == null ? "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DlfHx8fGVufDB8fHx8fA%3D%3D" : provider.profilePicture}
                                                                        alt="Profile"
                                                                        className="h-24 w-24 rounded-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                                                        <User className="h-12 w-12 text-gray-400" />
                                                                    </div>
                                                                )}
                                                                {profilePictureUploading && (
                                                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <FileUpload
                                                                    onFileUpload={async (file) => {
                                                                        setProfilePictureUploading(true);
                                                                        try {
                                                                            const formData = new FormData();
                                                                            formData.append('profilePicture', file);
                                                                            const response = await axios.post(
                                                                                `${API}/api/service-provider/upload-profile`,
                                                                                formData,
                                                                                { withCredentials: true }
                                                                            );
                                                                            if (response.data.success) {
                                                                                dispatch(checkProviderAuthStatus())
                                                                                toast.success("Profile picture updated successfully");
                                                                            }
                                                                        } catch (error) {
                                                                            toast.error("Failed to upload profile picture");
                                                                            console.error(error);
                                                                        } finally {
                                                                            setProfilePictureUploading(false);
                                                                        }
                                                                    }}
                                                                    accept="image/*"
                                                                    uploading={profilePictureUploading}
                                                                />
                                                                <p className="text-sm text-gray-500 mt-2">
                                                                    Recommended size: 500x500 pixels. Max file size: 5MB.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Full Name</Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            required
                                                            disabled
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            required
                                                            disabled
                                                        />
                                                    </div>

                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label htmlFor="about">About You</Label>
                                                        <Textarea
                                                            id="about"
                                                            name="about"
                                                            value={formData.about}
                                                            onChange={handleInputChange}
                                                            rows={4}
                                                            placeholder="Tell potential clients about your experience and expertise"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="contactInfo">Contact Number</Label>

                                                        <h3 className="text-gray-800 text-sm p-1">{formData.contactInfo}</h3>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="country">Country</Label>

                                                        <h3 className="text-gray-800 text-sm p-1">{formData.country}</h3>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="state">State</Label>

                                                        <h3 className="text-gray-800 text-sm p-1">{formData.state}</h3>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="city">City</Label>

                                                        <h3 className="text-gray-800 text-sm p-1">{formData.city}</h3>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="postalCode">Zip Code</Label>

                                                        <h3 className="text-gray-800 text-sm p-1">{formData.postalCode}</h3>
                                                    </div>

                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label>Verification Document</Label>
                                                        {formData.verificationDocument ? (
                                                            <div className="flex flex-col gap-4">
                                                                <div className="flex items-center gap-4">

                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                if (formData.verificationDocument) {
                                                                                    const fileUrl = `${formData.verificationDocument}`; // Forces Cloudinary to download
                                                                                    const link = document.createElement('a');
                                                                                    link.href = fileUrl;
                                                                                    link.download = formData.verificationDocument.split('/').pop() || 'document.pdf';
                                                                                    document.body.appendChild(link);
                                                                                    link.click();
                                                                                    document.body.removeChild(link);
                                                                                }
                                                                            }}
                                                                        >
                                                                            Download Document
                                                                        </Button>


                                                                        <Button
                                                                            variant="outline"
                                                                            onClick={() => setFormData({ ...formData, verificationDocument: null })}
                                                                        >
                                                                            Replace Document
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ) : (
                                                            <>
                                                                <PDFUpload
                                                                    onFileUpload={handleDocumentUpload}
                                                                    maxSize={30 * 1024 * 1024} // 5MB
                                                                    multiple={false} // Assuming single file upload
                                                                />
                                                                <p className="text-sm text-gray-500 mt-2">
                                                                    Kindly upload a PDF containing all relevant documents that verify your professional expertise and the services you provide.
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-between w-full">
                                                        {provider?.status === 'pending' && (
                                                            <div className="flex items-center gap-2 text-sm text-yellow-600">
                                                                <ClockIcon className="h-4 w-4" />
                                                                <span>Verification under review</span>
                                                            </div>
                                                        )}
                                                        {provider?.status === 'rejected' && (
                                                            <div className="space-y-2 md:col-span-2">
                                                                <Label>Reason for Rejection</Label>
                                                                <div className="p-4 bg-red-50 rounded-md border border-red-200">
                                                                    <p className="text-red-700">{rejectionReason}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {provider?.accountStatus === 'on_hold' && (
                                                        <div className="space-y-2 md:col-span-2">
                                                            <Label>Account On Hold - Reason</Label>
                                                            <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
                                                                <p className="text-yellow-700">{holdReason}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex justify-end gap-4">
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                        onClick={() => setIsDialogOpen(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" onClick={handleSubmit} className="bg-green-700 hover:bg-green-800" disabled={profileUpdating}>
                                                        {profileUpdating ? "Updating..." : "Save Changes"}
                                                    </Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>

                        {
                            !provider?.isSubscriptionHolder && (
                                <Card className="border rounded-lg shadow-sm bg-gradient-to-br from-green-50 to-green-100 border-green-200 h-full flex flex-col">
                                    <CardHeader className="border-b border-green-200 bg-green-100/50">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-800">PROFESSIONAL PLUS</h2>
                                            <Badge variant="outline" className="border-green-600 text-green-600">
                                                RECOMMENDED
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <div className="space-y-4 flex-grow">
                                            <div className="flex items-end gap-2">
                                                <span className="text-3xl font-bold">$199</span>
                                                <span className="text-gray-600">/year</span>
                                            </div>
                                            <ul className="space-y-3 text-gray-700">
                                                <li className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span><strong>Platform Choice Badges</strong> - Stand out as a verified top professional</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span><strong>Priority Placement</strong> - Appear in top spots for relevant searches</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span><strong>3× More Visibility</strong> - Get seen by more potential clients</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="pt-4">
                                            <Button
                                                onClick={handlePaymentSubmit}
                                                disabled={paymentProcessing}
                                                className="w-full bg-green-700 hover:bg-green-800 h-12 text-lg"
                                            >
                                                <Crown className="mr-2 h-5 w-5" />
                                                {paymentProcessing ? "Processing..." : "Upgrade Now"}
                                            </Button>
                                            <p className="text-center text-sm text-gray-500 mt-2">
                                                30-day money back guarantee
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        }

                        {/* Services Section */}
                        <ServicesContainer />

                        {/* Response Rate */}
                        {/* <Card className="border border-gray-200 rounded-lg shadow-sm lg:col-span-2">
                            <CardHeader className="border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Response Rate</h2>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <p className="text-gray-600">Estimated 87 leads per day</p>
                                        <p className="text-gray-700">You haven't responded to any leads yet.</p>
                                    </div>
                                    <Button variant="outline" className="border-green-700 text-green-700">
                                        View responses
                                    </Button>
                                </div>
                            </CardContent>
                        </Card> */}
                    </div>
                </div>
            </div>
        </>
    )
}