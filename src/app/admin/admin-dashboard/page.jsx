'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, Activity, ArrowUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios, { all } from "axios";
import { API } from "@/lib/data-service";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Trash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/AdminHeader";
export default function AdminDashboard() {
    const [statsData, setStatsData] = useState();
    const [paymentsData, setPaymentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [error, setError] = useState();
    const [paymentsError, setPaymentsError] = useState();
    const [totalServicerequest, setTotalServiceRequest] = useState()
    const [allRequest, setAllRequest] = useState({ count: 0, requests: [] })
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const getTotalAmount = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API}/api/admin/getTotalAmount`);
            setStatsData(response.data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const getTotalRequestedServices = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API}/api/admin/getServiceRequestTotalCount`);
            setTotalServiceRequest(response.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const getRecentPayments = async () => {
        setPaymentsLoading(true);
        try {
            const response = await axios.get(`${API}/api/admin/getTotalAmountWithDetails`);
            setPaymentsData(response.data.data);

        } catch (error) {
            setPaymentsError(error.message);
        } finally {
            setPaymentsLoading(false);
        }
    };
    const fetchServiceRequests = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API}/api/admin/getAllServiceRequest`);

            setAllRequest(prev => ({
                ...prev,
                count: response.data.count,
                requests: response.data.data
            }));

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTotalAmount();
        getRecentPayments();
        getTotalRequestedServices()
        fetchServiceRequests()

    }, []);
    const deleteSelectedRequest = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`${API}/api/admin/deleteServiceRequest/${id}`)
            if (response.data.success) {
                fetchServiceRequests()
                setIsDialogOpen(false)
            }
        } catch (error) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
        <AdminHeader/>
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-green-700 text-white p-6 shadow-md">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-green-100">Welcome back, Admin</p>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Stats Overview */}
                <section className="grid gap-6 md:grid-cols-3 mb-8 items-center">
                    {/* Total Revenue Card */}
                    <Card className="border-green-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-8 w-32" />
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold text-green-700">
                                        {statsData?.formattedTotal || "$0.00"}
                                    </div>
                                    <p className="text-xs text-green-600">
                                        from {statsData?.transactionCount || 0} transactions
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Service Requests Card */}
                    <Card className="border-green-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Purchased Leads
                            </CardTitle>
                            <ArrowUpDown className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-8 w-32" />
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold text-green-700">
                                        {totalServicerequest?.purchased || 0}
                                    </div>
                                    <div className="flex justify-between text-xs mt-1">
                                        {/* <span className="text-green-600">
                                            {totalServicerequest?.purchased || 0} purchased
                                        </span> */}
                                        <span className="text-gray-500">
                                            {totalServicerequest?.notPurchased || 0} left
                                        </span>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Growth Card (example static data) */}
                    <Card className="border-green-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Total Request
                            </CardTitle>
                            <Activity className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-700">
                                {allRequest.count || 0}
                            </div>
                            <p className="text-xs text-green-600">Purchased and Non-Purcahsed count</p>
                        </CardContent>
                    </Card>
                </section>
                <div className="flex gap-6">


                    {/* Recent Payments Table */}
                    <section className="bg-white rounded-lg w-[50%] shadow-sm border border-green-100 p-6">
                        <h2 className="text-lg font-semibold text-green-800 mb-4">
                            Recent Payments
                        </h2>

                        {paymentsLoading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : paymentsError ? (
                            <div className="text-center py-8 text-red-500">
                                Error loading payments: {paymentsError}
                            </div>
                        ) : paymentsData.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No recent payments found
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Payment ID</TableHead>
                                        <TableHead>Service Provider</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Service Type</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                        {/* <TableHead className="text-right">Actions</TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paymentsData.map((payment) => (
                                        <TableRow key={payment._id}>
                                            <TableCell className="font-medium">
                                                {payment._id.toString().slice(-6)}
                                            </TableCell>
                                            <TableCell>
                                                {payment.serviceProvider?.name || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {payment.serviceRequest?.user?.name || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {payment.serviceRequest?.serviceType || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {payment.formattedAmount}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </section>
                    <section className="bg-white rounded-lg w-[50%] shadow-sm border border-green-100 p-6">
                        <h2 className="text-lg font-semibold text-green-800 mb-4">
                            Service Requests
                        </h2>

                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 text-red-500">
                                Error loading requests: {error}
                            </div>
                        ) : allRequest.requests.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No recent service requests found
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Request ID</TableHead>
                                        <TableHead>Service Provider</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Service Type</TableHead>
                                        <TableHead >Purchased</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allRequest.requests.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell className="font-medium">
                                                {request._id.toString().slice(-6)}
                                            </TableCell>
                                            <TableCell>
                                                {request.serviceProvider?.map(provider => provider.name).join(", ")}

                                            </TableCell>
                                            <TableCell>
                                                {request.customer?.name || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {request.serviceType || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {request.isPurchased ? "Yes" : "No"}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {format(new Date(request.date), 'MMM dd, yyyy')}
                                            </TableCell>
                                            <TableCell className="text-left">
                                                <div className="flex justify-end">
                                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                        <DialogTrigger><Trash color="red" size={20} className="cursor-pointer" /></DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription>
                                                                    This action cannot be undone. This will permanently delete this request.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <div className="flex gap-3">
                                                                    <DialogClose asChild>
                                                                        <Button className={"bg-white text-black cursor-pointer hover:bg-white"}>Cancel</Button>
                                                                    </DialogClose>
                                                                    <Button type="danger" className={"bg-red-600 cursor-pointer"} onClick={() => deleteSelectedRequest(request._id)}>Confirm</Button>
                                                                </div>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>


                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </section>
                </div>

            </main>
        </div>
        </>
    );
}