'use client'
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader"
import { useState, useEffect } from 'react';
import { Search, Bell, Mail, CreditCard, User, ChevronDown, CheckCircle, MapPin } from 'lucide-react';
import axios from 'axios';
import { API } from "@/lib/data-service";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51RJj3ZCkhStwG9g0TqEdDFkjXh56MvomnCibFbf1ijemDQ1TkHwjsb5oJ2AG3ePLAi8Np9FLNZsmz4N2CA4sKEhn00vHNOmlYC");
import { Elements } from '@stripe/react-stripe-js';
const Page = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedLead, setSelectedLead] = useState(null);
    const [allLeads, setAllLeads] = useState([]);
    const [yourLeads, setYourLeads] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [providerId, setProviderId] = useState(null);
    const { provider } = useSelector(state => state.auth);
    useEffect(() => {
        if (provider?._id) {
            setProviderId(provider._id);
            fetchLeads(provider._id);
        }
    }, [provider]); // Watch for changes in provider

    const fetchLeads = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API}/api/leads/get-all-matching-leads-of-provider/${id}`);
            const leads = response.data.leads;

            // Transform all leads at once
            const transformedLeads = await Promise.all(
                leads.map(lead => transformLead(lead, id))
            );

            const yourLeads = transformedLeads.filter(lead =>
                lead.serviceProvider && lead.serviceProvider.includes(id)
            );
            const allLeads = transformedLeads.filter(lead =>
                !lead.serviceProvider || !lead.serviceProvider.includes(id)
            );

            setAllLeads(allLeads);
            setYourLeads(yourLeads);

        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };


    const leadsToShow = activeTab === 'all' ? allLeads : yourLeads;

    const transformLead = async (lead, providerId) => { // Added providerId parameter
        try {
            const response = await axios.post(`${API}/api/category/get-category-pricing`, {
                category: lead.serviceType
            });
            console.log("API Response:", response.data);
            // Default values when pricing isn't available
            const credits = response.data?.pricing
                ? '$' + (response.data.pricing / 100).toFixed(2)
                : '$0.00';

            return {
                id: lead._id,
                name: lead.customerDetails?.name || 'Unknown Customer',
                location: lead.customerDetails?.address || 'Location not specified',
                status: "High hiring intent",
                verified: true,
                service: lead.serviceType,
                description: getDynamicDescription(lead),
                credits,
                requested: lead.serviceProvider?.includes(providerId),
                photos: lead.photos,
                kind: lead.kind,
                details: getDynamicDetails(lead),
                ...lead
            };
        } catch (error) {
            console.error('Error transforming lead:', error);
            // Return a lead with default values when there's an error
            return {
                id: lead._id,
                name: lead.customerDetails?.name || 'Unknown Customer',
                location: lead.customerDetails?.address || 'Location not specified',
                status: "High hiring intent",
                verified: true,
                service: lead.serviceType,
                description: getDynamicDescription(lead),
                credits: '$0.00',
                requested: lead.serviceProvider?.includes(providerId),
                photos: lead.photos,
                kind: lead.kind,
                details: getDynamicDetails(lead),
                ...lead
            };
        }
    };

    const getDynamicDescription = (lead) => {
        return lead.additionalNotes ||
            lead.areaDescription ||
            lead.itemsDescription ||
            lead.shortDescription ||
            lead.serviceTypeSubSubCategory;
    };

    const getDynamicDetails = (lead) => {
        const details = {};
        const excludeFields = [
            '_id', '__v', 'createdAt', 'updatedAt',
            'customerDetails', 'serviceProvider',
            'photos', 'status', 'serviceType',
            'serviceTypeSubCategory', 'serviceTypeSubSubCategory'
        ];

        for (const [key, value] of Object.entries(lead)) {
            if (!excludeFields.includes(key) && value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        details[key] = value.join(', ');
                    }
                }
                else if (typeof value === 'object' && value !== null) {
                    details[key] = JSON.stringify(value);
                }
                else {
                    details[key] = value;
                }
            }
        }

        return details;
    };

    return (
        <>
            <ProfessionalHeader />
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-800">Leads</h1>
                        <div className="flex items-center mt-2">
                            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                            <span className="text-sm text-gray-600">
                                {activeTab === 'all'
                                    ? `${allLeads.length} available leads`
                                    : `${yourLeads.length} requested leads`}
                            </span>
                        </div>
                    </div>


                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('yours')}
                            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'yours' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                        >
                            Your Leads
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                        >
                            All Leads
                        </button>
                    </div>

                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {selectedLead ? (
                        <LeadDetailView
                            lead={selectedLead}
                            onBack={() => setSelectedLead(null)}
                        />
                    ) : loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <PulseLoader color="#16a34a" size={20} />
                                <p className="mt-4 text-gray-600">Loading leads...</p>
                            </div>
                        </div>
                    ) : leadsToShow.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {leadsToShow.map((lead) => (
                                <LeadCard
                                    key={lead._id}
                                    lead={lead}
                                    onClick={() => setSelectedLead(lead)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <div className="text-gray-400 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">
                                    {activeTab === 'all'
                                        ? "No available leads matching your services"
                                        : "No leads have requested you specifically"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

const LeadCard = ({ lead, onClick }) => {
    console.log(lead);
    return (
        <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-gray-900">{lead.name}</h3>
                    </div>
                    {lead.verified && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center mb-3">
                    <div className={`h-2 w-2 rounded-full mr-2  bg-yellow-500`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{lead.status}</span>
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold text-gray-900">{lead.service}</h4>
                    <p className="text-sm text-gray-600 mt-1">{lead.description}</p>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700">{lead.credits}</span>
                </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800">
                    View Details
                </button>
            </div>
        </div>
    );
};

const LeadDetailView = ({ lead, onBack }) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setPaymentError(null);

        try {
            // 1. Initiate checkout session
            const response = await axios.post(`${API}/api/payments/initiate`, {
                serviceRequestId: lead.id
            }, { withCredentials: true });

            // 2. Redirect to Stripe Checkout using Stripe.js
            const { error } = (await stripePromise).redirectToCheckout({
                sessionId: response.data.sessionId
            });

            if (error) {
                throw error;
            }

        } catch (err) {
            setPaymentError(err.response?.data?.error || err.message);
            setPaymentProcessing(false);
        }
    };

    if (paymentSuccess) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">You've successfully accepted this lead.</p>
                        <button
                            onClick={onBack}
                            className="w-full max-w-xs mx-auto py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Back to Leads
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header Section */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
                        </div>
                        {lead.verified && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Verified
                            </span>
                        )}
                    </div>
                </div>

                {/* Status and Service Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className={`h-3 w-3 rounded-full mr-2 bg-yellow-500`} />
                        <span className="font-medium text-gray-700">{lead.status}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{lead.service}</h3>
                    <p className="text-gray-600 mb-6">{lead.description}</p>

                    {lead.requested && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
                            <h4 className="font-medium text-green-800 mb-1">Client Requested You Specifically</h4>
                            <p className="text-sm text-green-700">This client asked for you by name.</p>
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="p-6 border-b border-gray-200">
                    <h4 className="font-medium text-lg mb-4">Service Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {Object.entries(lead.details || {})
                            .filter(([key]) => !['customer', 'kind', 'isPurchased', 'purchasedPrice'].includes(key))
                            .map(([key, value]) => (
                                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm font-medium text-gray-500 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                    <p className="text-gray-800">{value}</p>
                                </div>
                            ))}
                    </div>

                    {lead.photos?.length > 0 && (
                        <>
                            <h4 className="font-medium text-lg mb-3">Photos</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                {lead.photos.map((photo, index) => {
                                    // Extract the filename from the photo URL/path
                                    const fileName = photo.split('/').pop();

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => window.open(`${API}${photo}`, '_blank')}
                                            className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center"
                                        >
                                            <div className="text-center truncate w-full" title={fileName}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm mt-1 block truncate">{fileName}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Payment Section */}
                <div className="p-6">
                    {paymentError && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                            {paymentError}
                        </div>
                    )}

                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                        <h4 className="font-medium text-lg mb-4">Payment Details</h4>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Lead Price</p>
                                <p className="text-xl font-bold text-green-600">{lead.credits}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Timeline</p>
                                <p className="font-medium">ASAP</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={paymentProcessing}
                                className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={handlePaymentSubmit}
                            >
                                {paymentProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    `Pay ${lead.credits}`
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PulseLoader = ({ color, size }) => {
    return (
        <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={`rounded-full bg-${color} animate-pulse`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${i * 0.2}s`,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default Page;