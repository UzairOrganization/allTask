'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, Activity, ArrowUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { API } from "@/lib/data-service";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState();
    const [paymentsData, setPaymentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [error, setError] = useState();
    const [paymentsError, setPaymentsError] = useState();

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

    const getRecentPayments = async () => {
        setPaymentsLoading(true);
        try {
            const response = await axios.get(`${API}/api/admin/getTotalAmountWithDetails`);
            setPaymentsData(response.data.data);
            console.log(response.data.data);
            
        } catch (error) {
            setPaymentsError(error.message);
        } finally {
            setPaymentsLoading(false);
        }
    };

    useEffect(() => {
        getTotalAmount();
        getRecentPayments();
    }, []);

    return (
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

                    {/* Recent Transactions Card */}
                    <Card className="border-green-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Transactions
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-8 w-32" />
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <div className="text-2xl font-bold text-green-700">
                                    {statsData?.transactionCount || 0}
                                </div>
                            )}
                            <p className="text-xs text-green-600">completed payments</p>
                        </CardContent>
                    </Card>

                    {/* Growth Card (example static data) */}
                    <Card className="border-green-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Recent Payments
                            </CardTitle>
                            <Activity className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-700">
                                {paymentsData.length || 0}
                            </div>
                            <p className="text-xs text-green-600">last 30 days</p>
                        </CardContent>
                    </Card>
                </section>

                {/* Recent Payments Table */}
                <section className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
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
            </main>
        </div>
    );
}