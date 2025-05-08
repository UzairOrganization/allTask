'use client'
import { XCircle, ArrowRight, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentCanceled({ searchParams }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/50 to-white">
            <div className="max-w-lg mx-auto pt-24 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-red-100">
                        <XCircle className="h-14 w-14 text-red-600" strokeWidth={1.5} />
                    </div>

                    {/* Heading */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Payment Canceled
                        </h1>
                        <p className="text-lg text-gray-600 max-w-md mx-auto">
                            Your transaction was not completed. No amount has been charged.
                        </p>
                    </div>

                    {/* Alert card */}
                    <div className="mt-6 bg-red-50/50 border border-red-100 rounded-lg p-4 text-left">
                        <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">Important</h3>
                                <p className="text-sm text-red-700 mt-1">
                                    If this was unexpected, please try again or contact support.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction details */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-left">
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">Reference ID</span>
                                <span className="font-medium text-gray-900">
                                    {searchParams.session_id?.slice(0, 8)}...
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-500">Status</span>
                                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                                    Canceled
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild className="bg-green-700 hover:bg-green-800 px-6 py-3">
                            <Link href="/leads" className="flex items-center gap-2">
                                Try Again <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="px-6 py-3">
                            <Link href="/professional-dashboard" className="flex items-center gap-2">
                                Return to Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}