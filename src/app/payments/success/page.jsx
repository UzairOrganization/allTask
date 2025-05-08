'use client'
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

export default function PaymentSuccess({ searchParams }) {
    const [progress, setProgress] = useState(0)
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        // Progress animation
        const timer = setTimeout(() => setProgress(100), 500)

        // Simulate payment verification
        const verifyTimer = setTimeout(() => setIsVerified(true), 1500)

        return () => {
            clearTimeout(timer)
            clearTimeout(verifyTimer)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50/50 to-white">
            <div className="max-w-lg mx-auto pt-24 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-6">
                    {/* Animated checkmark */}
                    <div className="relative">
                        <div className={`absolute inset-0 bg-green-100 rounded-full scale-0 ${isVerified ? 'animate-ping-once' : ''}`}></div>
                        <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-green-100 relative">
                            <CheckCircle className="h-14 w-14 text-green-700" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Progress indicator during verification */}
                    {!isVerified && (
                        <div className="space-y-2">
                            <p className="text-green-700 font-medium">Verifying payment...</p>
                            <Progress value={progress} className="h-2 bg-green-100" indicatorClassName="bg-green-700" />
                        </div>
                    )}

                    {/* Content after verification */}
                    {isVerified && (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Payment Confirmed!
                            </h1>
                            <p className="text-lg text-gray-600 max-w-md mx-auto">
                                Your lead has been successfully secured. We've sent the details to your email.
                            </p>

                            {/* Order summary card */}
                            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-green-100 text-left">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <span className="bg-green-100 text-green-700 p-1.5 rounded-lg mr-3">
                                        <CheckCircle className="h-5 w-5" />
                                    </span>
                                    Order Summary
                                </h2>

                                <div className="mt-5 space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Transaction ID</span>
                                        <span className="font-medium text-gray-900">
                                            {searchParams.session_id?.slice(0, 8)}...
                                            <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0 text-gray-400 hover:text-green-700">
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </Button>
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Amount</span>
                                        <span className="font-medium text-gray-900">$15.00</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-500">Status</span>
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                <Button asChild className="bg-green-700 hover:bg-green-800 px-6 py-3">
                                    <Link href="/professional-dashboard" className="flex items-center gap-2">
                                        Go to Dashboard <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="px-6 py-3">
                                    <Link href="/leads" className="flex items-center gap-2">
                                        Browse More Leads
                                    </Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Add these to your global CSS */}
            <style jsx global>{`
        @keyframes ping-once {
          0% { transform: scale(0.8); opacity: 0.8; }
          70% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-ping-once {
          animation: ping-once 1s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>

        </div>
    )
}