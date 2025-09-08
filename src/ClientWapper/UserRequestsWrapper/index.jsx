'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
    Card, CardHeader, CardTitle, CardDescription, CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
    RocketIcon, CalendarIcon, HomeIcon, MoveIcon, HammerIcon,
    MailIcon, PhoneIcon, MapPinIcon, ImageIcon, ClockIcon
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { API } from '@/lib/data-service'
import axios from 'axios'

export default function UserRequestsWrapper() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${API}/api/leads/getUserRequest`, { withCredentials: true })
                setRequests(response.data)
            } catch (err) {
                setRequests([])
            } finally {
                setLoading(false)
            }
        }

        fetchRequests()
    }, [])

    const getStatusVariant = (status) => {
        switch (status) {
            case 'completed': return 'success'
            case 'assigned': return 'secondary'
            case 'cancelled': return 'destructive'
            default: return 'default'
        }
    }

    const getServiceIcon = (serviceType) => {
        switch (serviceType.toLowerCase()) {
            case 'handyman': return <HammerIcon className="h-5 w-5" />
            case 'moving': return <MoveIcon className="h-5 w-5" />
            default: return <HomeIcon className="h-5 w-5" />
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container max-w-6xl mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (requests.length === 0) {
        return (
            <div className="container max-w-6xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
                <div className="max-w-md space-y-6">
                    <RocketIcon className="h-16 w-16 mx-auto text-primary" />
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">No Service Requests Yet</h2>
                    <p className="text-muted-foreground px-4 sm:px-0">
                        You haven't requested any services yet. Get started by requesting a service that matches your needs.
                    </p>
                    <Button
                        size="lg"
                        className="mx-auto bg-[#007D63] cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        Request a Service
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-8">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Service Requests</h1>
                <p className="text-muted-foreground mt-2">
                    View and manage all your service requests in one place
                </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {requests.map((request) => (
                    <Card key={request._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="flex items-center space-x-3">
                                {getServiceIcon(request.serviceType)}
                                <div>
                                    <CardTitle className="capitalize text-base sm:text-lg">
                                        {request.serviceType}
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-xs sm:text-sm">
                                        {request.customerDetails.address}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <CalendarIcon className="mr-1 h-4 w-4" />
                                    <span className="text-xs sm:text-sm">{formatDate(request.createdAt)}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedRequest(request)}
                                    className="text-xs sm:text-sm"
                                >
                                    View Details
                                </Button>
                                {/* {request.status === 'pending' && (
                                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                                        Cancel Request
                                    </Button>
                                )} */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Details Dialog */}
            <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
                {selectedRequest && (
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] max-w-[95vw] sm:w-full sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                {getServiceIcon(selectedRequest.serviceType)}
                                <span className="capitalize">{selectedRequest.serviceType} Details</span>
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 sm:gap-6">
                            {/* Service Info Section */}
                            <div className="grid gap-3 sm:gap-4">
                                <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                    <HammerIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Service Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Service Type</p>
                                        <p className="font-medium text-sm sm:text-base">{selectedRequest.serviceType}</p>
                                    </div>
                                    {/* <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <Badge variant={getStatusVariant(selectedRequest.status)} className="text-xs">
                                            {selectedRequest.status}
                                        </Badge>
                                    </div> */}
                                </div>
                            </div>

                            {/* Customer Details Section */}
                            <div className="grid gap-3 sm:gap-4">
                                <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                    <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Your Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <MailIcon className="h-4 w-4" /> Email
                                        </p>
                                        <p className="font-medium text-sm sm:text-base break-words">{selectedRequest.customerDetails.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Contact Preference</p>
                                        <p className="font-medium text-sm sm:text-base">{selectedRequest.customerDetails.contactPreference}</p>
                                    </div>
                                    
                                    <div className="col-span-1 sm:col-span-2">
                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <MapPinIcon className="h-4 w-4" /> Address
                                        </p>
                                        <p className="font-medium text-sm sm:text-base">{selectedRequest.customerDetails.address}</p>
                                        <p className="text-sm text-muted-foreground">
                                            ZIP: {selectedRequest.customerDetails.zipCode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Provider Section */}
                            {selectedRequest.serviceProvider && selectedRequest.serviceProvider.length > 0 && (
                                <div className="grid gap-3 sm:gap-4">
                                    <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                        <span className="bg-secondary p-1 rounded-full">
                                            <HomeIcon className="h-4 w-4" />
                                        </span>
                                        {selectedRequest.serviceProvider.length > 1 ? 'Selected Providers' : 'Selected Provider'}
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedRequest.serviceProvider.map((provider, index) => (
                                            <div key={provider._id} className="border rounded-lg p-3 sm:p-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Professionals Name</p>
                                                        <p className="font-medium text-sm sm:text-base">{provider.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Photos Section */}
                            {selectedRequest.photos && selectedRequest.photos.length > 0 && (
                                <div className="grid gap-3 sm:gap-4">
                                    <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                        Attached Photos
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                        {selectedRequest.photos.map((photo, index) => {
                                            return (
                                                <div key={index} className="border rounded-lg overflow-hidden">
                                                    <img
                                                        src={`${API}${photo}`}
                                                        alt={`Service photo ${index + 1}`}
                                                        className="w-full h-24 sm:h-32 object-cover"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Dates Section */}
                            <div className="grid gap-3 sm:gap-4">
                                <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                    <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Timeline
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Request Created</p>
                                        <p className="font-medium text-sm sm:text-base">{formatDate(selectedRequest.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Last Updated</p>
                                        <p className="font-medium text-sm sm:text-base">{formatDate(selectedRequest.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}