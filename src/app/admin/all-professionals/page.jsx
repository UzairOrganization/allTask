'use client'; // Mark as client component

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaymentStats } from "@/hooks/usePaymentStats";
import axios from "axios";
import { API } from "@/lib/data-service";
import { useState } from "react";

export default function AdminDashboard() {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const getTotalAmount = async () => {
        setIsLoading(true)
        try {

            const response = await axios.get(`${API}/api/admin/getTotalAmount`)
            console.log(response);
            setIsLoading(false)
            setData(response.data)

        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }
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
                <section className="grid gap-6 md:grid-cols-3 mb-8">
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
                                        {data?.formattedTotal || "$0.00"}
                                    </div>
                                    <p className="text-xs text-green-600">
                                        from {data?.transactionCount || 0} transactions
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
                                    {data?.transactionCount || 0}
                                </div>
                            )}
                            <p className="text-xs text-green-600">completed payments</p>
                        </CardContent>
                    </Card>

                    {/* Growth Card (example static data) */}
                    <Card className="border-green-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Growth
                            </CardTitle>
                            <Activity className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-700">+12.5%</div>
                            <p className="text-xs text-green-600">vs last month</p>
                        </CardContent>
                    </Card>
                </section>

                {/* Recent Payments Table - You'll implement this later */}
                <section className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
                    <h2 className="text-lg font-semibold text-green-800 mb-4">
                        Recent Payments
                    </h2>
                    <div className="text-center py-8 text-gray-500">
                        Payment history will appear here
                    </div>
                </section>
            </main>
        </div>
    );
}