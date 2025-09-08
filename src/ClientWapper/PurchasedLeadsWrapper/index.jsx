'use client'
import { useState, useEffect } from 'react'
import {
    ChevronDown,
    Download,
    CheckCircle,
    Clock,
    XCircle,
    User,
    MapPin,
    Mail,
    Phone,
    AlertCircle,
    ChevronLeft,
    Calendar,
    ChevronRight,
    PhoneCall
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { API } from '@/lib/data-service'
import axios from 'axios'
import ProfessionalHeader from '@/components/Professionals/ProfessionalHeader'
import { useRouter } from 'next/navigation'

export default function PurchasedLeadsPage() {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const navigation = useRouter()
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${API}/api/payments`, { withCredentials: true })
                setPayments(res.data.result)
            } finally {
                setLoading(false)
            }
        }
        fetchPayments()
    }, [])

    const StatusBadge = ({ status }) => {
        const variants = {
            completed: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="h-4 w-4" /> },
            failed: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="h-4 w-4" /> }
        }

        return (
            <Badge className={`${variants[status]?.bg} ${variants[status]?.text} gap-1`}>
                {variants[status]?.icon}
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </Badge>
        )
    }

    const renderServiceDetails = (serviceRequest, payment) => {
        if (!serviceRequest) return null;
        
        // Format purchased date consistently
        const formatPurchaseDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        // Common customer details (including formatted purchased date)
        const customerDetails = [
            { label: 'Name', value: serviceRequest.customerDetails?.name, icon: <User className="h-4 w-4" /> },
            { label: 'Email', value: serviceRequest.customerDetails?.email, icon: <Mail className="h-4 w-4" /> },
            { label: 'Address', value: serviceRequest.customerDetails?.address, icon: <MapPin className="h-4 w-4" /> },
            { label: 'Phone No', value: serviceRequest.customerDetails?.phoneNo, icon: <PhoneCall className="h-4 w-4" /> },
            { label: 'Contact Preference', value: serviceRequest.customerDetails?.contactPreference, icon: <Phone className="h-4 w-4" /> },
            { label: 'Purchased Date', value: formatPurchaseDate(serviceRequest.purchasedDate), icon: <Calendar className="h-4 w-4" /> }
        ].filter(detail => detail.value) // Only show if value exists

        // Get all non-empty question/answer pairs from service request
        const excludedFields = [
            '_id', 'customer', 'serviceProvider', 'photos',
            'status', 'createdAt', 'updatedAt', '__v', 'kind',
            'purchasedBy', 'isPurchased', 'purchasedPrice', "purchasedDate", "serviceTypeSubSubCategory", "serviceTypeSubCategory"
        ]
        
        const handleStartConversation = async () => {
            try {
                const result = await axios.post(
                    `${API}/api/chats/init/${payment._id}`
                );
                navigation.push("/chat/professional")
                return result.data;
            } catch (error) {
                console.error('Failed to start conversation:', error.response?.data || error.message);
                if (error.response?.status === 400) {
                    return { existingConversation: true, conversation: error.response.data };
                }
                throw error;
            }
        }
        
        const serviceQuestions = Array.isArray(serviceRequest.questions)
            ? serviceRequest.questions.map(q => ({
                question: q.questionText,
                answer: q.answer
            }))
            : [];

        // Handle array fields
        const excludedArrayFields = ['serviceProvider', 'photos']
        const arrayFields = Object.entries(serviceRequest)
            .filter(([key, value]) =>
                Array.isArray(value) &&
                value.length > 0 &&
                !excludedArrayFields.includes(key)
            )
            .map(([key, value]) => ({
                question: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
                answer: value.join(', ')
            }))

        return (
            <div className="space-y-6">
                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {customerDetails.map((detail, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                {detail.icon}
                                {detail.label}
                            </p>
                            <p className="break-words">{detail.value}</p>
                        </div>
                    ))}
                </div>

                {/* Service Questions */}
                {([...serviceQuestions, ...arrayFields].length > 0) && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Service Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[...serviceQuestions].map((item, i) => {
                                const question = typeof item.question === 'string' ? item.question : 'Question';
                                const answer = typeof item.answer === 'string' ? item.answer : JSON.stringify(item.answer);
                                return (
                                    <div key={i} className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500">{question}</p>
                                        <p className="capitalize break-words">{answer}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Photos if available */}
                {serviceRequest.photos?.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Attached Photos</h3>
                        <div className="flex flex-wrap gap-2">
                            {serviceRequest.photos.map((photo, i) => {
                                return (
                                    <img
                                        key={i}
                                        src={`${API}${photo}`}
                                        alt={`Photo ${i + 1}`}
                                        className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-md"
                                    />
                                )
                            })}
                        </div>
                    </div>
                )}
                
                {serviceRequest.customer && serviceRequest.isPurchased && !payment?.isConversationStarted ? (
                    <div className='mt-4'>
                        <Button
                            onClick={handleStartConversation}
                            className="bg-green-700 cursor-pointer hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out w-full sm:w-auto"
                        >
                            Start Conversation
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                ) : (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-black">
                                    {!serviceRequest.customer ? (
                                        <>This customer is not registered on our platform. Please contact them directly using the provided email or phone number.</>
                                    ) : payment?.isConversationStarted ? (
                                        <>You've already started a conversation with this customer. Check your messages to continue the discussion.</>
                                    ) : (
                                        <>This lead hasn't been purchased yet. Purchase the lead to enable messaging.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    
    return (
        <>
            <ProfessionalHeader />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8 max-w-7xl">
                    {/* Mobile back button when details are open */}
                    {selectedPayment && (
                        <div className="md:hidden mb-4">
                            <Button
                                variant="outline"
                                className="flex items-center"
                                onClick={() => setSelectedPayment(null)}
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Back to list
                            </Button>
                        </div>
                    )}
                    
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Payments List */}
                        <div className={`flex-1 ${selectedPayment ? 'hidden lg:block' : 'block'}`}>
                            <h1 className="text-2xl font-bold mb-6">Purchased Leads</h1>

                            {loading ? (
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-20 w-full" />
                                    ))}
                                </div>
                            ) : payments.length === 0 ? (
                                <Card>
                                    <CardContent className="py-12 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <AlertCircle className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-medium">There's no purchased leads.</h3>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-center min-w-[120px]">Service</TableHead>
                                                    <TableHead className="text-center min-w-[100px]">Amount</TableHead>
                                                    <TableHead className="text-center min-w-[120px]">Date</TableHead>
                                                    <TableHead className="text-center min-w-[130px]">Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {payments
                                                    .filter(payment => payment.paymentStatus === 'completed')
                                                    .sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt))
                                                    .map((payment) => (
                                                        <TableRow
                                                            key={payment._id}
                                                            onClick={() => setSelectedPayment(payment)}
                                                            className="cursor-pointer hover:bg-gray-50"
                                                        >
                                                            <TableCell className="text-center align-middle">
                                                                <div className="font-medium mx-auto line-clamp-1">
                                                                    {payment.serviceRequest?.serviceType || 'Service'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {new Date(payment.serviceRequest?.createdAt).toLocaleDateString('en-US')}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center align-middle">
                                                                ${(payment.amount / 100).toFixed(2)}
                                                            </TableCell>
                                                            <TableCell className="text-center align-middle">
                                                                {new Date(payment.purchasedAt).toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell className="text-center align-middle">
                                                                <div className="flex justify-center">
                                                                    <StatusBadge status={payment.paymentStatus} />
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Lead Details - Always visible on desktop, conditional on mobile */}
                        {selectedPayment && (
                            <div className="lg:flex-1">
                                {/* Desktop back button */}
                                <div className="hidden md:block mb-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedPayment(null)}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-2" />
                                        Back to list
                                    </Button>
                                </div>
                                
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                            <span className="text-xl">Lead Details</span>
                                            <StatusBadge status={selectedPayment.paymentStatus} />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {renderServiceDetails(selectedPayment.serviceRequest, selectedPayment)}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}