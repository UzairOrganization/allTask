'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
    RocketIcon, CalendarIcon, HomeIcon, MoveIcon, HammerIcon,
    MailIcon, MapPinIcon, ImageIcon, ClockIcon
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { API } from '@/lib/data-service'
import { toast, Toaster } from 'sonner'

export default function UserRequestsWrapper() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [statusModal, setStatusModal] = useState(false) // 🔹 for Change Status modal
    const [selectedStatus, setSelectedStatus] = useState('')
    const [updating, setUpdating] = useState(false)
    const router = useRouter()
    const [detailsModal, setDetailsModal] = useState(false)

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${API}/api/leads/getUserRequest`, { withCredentials: true })


            setRequests(response.data.requests)
        } catch (err) {
            setRequests([])
            setError('Failed to fetch requests.')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {


        fetchRequests()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    }

    const handleStatusUpdate = async () => { // 🔹 update request status
        if (!selectedRequest || !selectedStatus) return
        setUpdating(true)
        try {
            await axios.patch(`${API}/api/leads/update-lead-status/${selectedRequest._id}`, {
                status: selectedStatus
            }, { withCredentials: true })

            await fetchRequests()
            toast.success("Status has been updated successfully.")
            setSelectedStatus('')
            setStatusModal(false)
        } catch (err) {
            console.error(err)
            toast.error('Failed to update status.')
        } finally {
            setUpdating(false)
        }
    }

    const statusOptions = [
        "Completed",
        "In Progress",
        "Declined",
        "Scheduled",
        "Not Scheduled Yet"
    ]

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-6xl mx-auto rounded-lg" />
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
            <div className="container max-w-6xl mx-auto px-4 py-12 flex flex-col mt-16 items-center justify-center min-h-[90vh] text-center">
                <div className="max-w-md space-y-6">
                    <RocketIcon className="h-16 w-16 mx-auto text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight">No Service Requests Yet</h2>
                    <p className="text-muted-foreground">
                        You haven't requested any services yet.
                    </p>
                    <Button
                        size="lg"
                        className="mx-auto bg-[#007D63]"
                        onClick={() => router.push('/')}
                    >
                        Request a Service
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Toaster />
            <div className="container max-w-6xl mx-auto px-4 mt-6 py-16">

                <h1 className="text-3xl font-bold mb-4">Your Service Requests</h1>

                <div className="space-y-6">
                    {requests.map((request) => (
                        <Card key={request._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className='w-full flex justify-between items-center'>
                                    <div className='p-2'>

                                        <CardTitle className="capitalize">{request.serviceType}</CardTitle>
                                        <CardDescription>{request.customerDetails.address}</CardDescription>
                                    </div>
                                    <div className='border pl-4 pr-4 p-2 text-white rounded-xl mr-2 bg-[#008b6e]'>
                                        {request.status}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <CalendarIcon className="mr-1 h-4 w-4" />
                                        {formatDate(request.createdAt)}
                                    </div>
                                </div>

                                <div className="mt-4 flex space-x-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedRequest(request)
                                            setDetailsModal(true)
                                        }}
                                    >
                                        View Details
                                    </Button>


                                    {/* 🔹 New button to open status modal */}
                                    {/* <Button
                                        size="sm"
                                        className="bg-[#007D63] text-white"
                                        onClick={() => {
                                         

                                            setSelectedRequest(request)
                                            setStatusModal(true)
                                        }}
                                    >
                                        Change Status
                                    </Button> */}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* 🔹 Status Modal */}
                <Dialog open={statusModal} onOpenChange={setStatusModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change Request Status</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-3">
                            {statusOptions.map(status => (
                                <Button
                                    key={status}
                                    variant={selectedStatus === status ? "default" : "outline"}
                                    className="justify-start"
                                    onClick={() => setSelectedStatus(status)}
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button
                                disabled={updating || !selectedStatus}
                                onClick={handleStatusUpdate}
                                className="bg-[#007D63]"
                            >
                                {updating ? 'Updating...' : 'Confirm'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                {/* 🔹 View Details Modal */}
                <Dialog open={detailsModal} onOpenChange={setDetailsModal}>
                    <DialogContent className="max-w-2xl h-[500px] overflow-y-scroll">
                        <DialogHeader>
                            <DialogTitle>Service Request Details</DialogTitle>
                        </DialogHeader>

                        {selectedRequest && (
                            <div className="space-y-4 text-sm">

                                {/* Service Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-muted-foreground">Service Type</p>
                                        <p className="font-medium">{selectedRequest.serviceType}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Status</p>
                                        <Badge className="bg-[#008b6e] text-white">
                                            {selectedRequest.status}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="border rounded-lg p-4 space-y-2">
                                    <h4 className="font-semibold">Customer Details</h4>
                                    <p><b>Name:</b> {selectedRequest.customerDetails?.name}</p>
                                    <p><b>Email:</b> {selectedRequest.customerDetails?.email}</p>
                                    <p><b>Phone:</b> {selectedRequest.customerDetails?.phoneNo}</p>
                                    <p><b>Address:</b> {selectedRequest.customerDetails?.address}</p>
                                    <p><b>Zip Code:</b> {selectedRequest.customerDetails?.zipCode}</p>
                                </div>

                              

                             

                                {/* Uploaded Photos */}
                                {selectedRequest.photos?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2">Uploaded Photos</h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {selectedRequest.photos.map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={`${API}${img}`}
                                                    alt="service"
                                                    className="rounded-md border object-cover h-24 w-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}                               

                            </div>
                        )}

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDetailsModal(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </>
    )
}
