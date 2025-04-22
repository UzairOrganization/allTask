'use client'
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader"
import { useState, useEffect } from 'react';
import { Search, Bell, Mail, CreditCard, User, ChevronDown, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API } from "@/lib/data-service";
import { useSelector } from "react-redux";

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
            fetchServices(provider._id);
        }
    }, [provider]); // Watch for changes in provider

    const fetchLeads = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API}/api/leads/get-all-matching-leads-of-provider/${id}`);
            const leads = response.data.leads;

            const yourLeads = leads.filter(lead =>
                lead.serviceProvider && lead.serviceProvider.includes(id)
            );
            const allLeads = leads.filter(lead =>
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

    const fetchServices = async (id) => {
        try {
            setServicesLoading(true);
            const response = await axios.get(`${API}/api/leads/get-subsubcategories-leads-of-provider/${id}`);
            if (response.data.leadsCount) {
                setServices(response.data.leadsCount);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setServicesLoading(false);
        }
    };

    const leadsToShow = activeTab === 'all' ? allLeads : yourLeads;

    const transformLead = (lead) => {
        return {
            id: lead._id,
            name: lead.customerDetails?.name || 'Unknown Customer',
            location: lead.customerDetails?.address || 'Location not specified',
            status: "High hiring intent",
            verified: true,
            service: lead.serviceTypeSubSubCategory,
            description: getDynamicDescription(lead),
            credits: '$' + 15,
            requested: lead.serviceProvider?.includes(providerId),
            photos: lead.photos,
            kind: lead.kind,
            details: getDynamicDetails(lead),
            ...lead
        };
    };

    const getDynamicDescription = (lead) => {
        return lead.issueDescription ||
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
                            onClick={() => setActiveTab('all')}
                            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                        >
                            All Leads
                        </button>
                        <button
                            onClick={() => setActiveTab('yours')}
                            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'yours' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
                        >
                            Your Leads
                        </button>
                    </div>

                    {/* Services Section */}
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Your Services</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {servicesLoading ? (
                                <div className="flex justify-center py-4">
                                    <PulseLoader color="#16a34a" size={8} />
                                </div>
                            ) : services.length > 0 ? (
                                services.map((service) => (
                                    <div
                                        key={service.subSubCategory}
                                        className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded"
                                    >
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                            <span className="text-sm truncate">
                                                {service.subSubCategory}
                                            </span>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${service.count > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {service.count}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-2">
                                    <span className="text-sm text-gray-500">No services found</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Credits */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <CreditCard className="h-5 w-5 text-green-700 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Your Credits</span>
                            </div>
                            <span className="text-sm font-bold text-green-700">120</span>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Bell className="h-5 w-5 text-green-700 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Notifications</span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">3 new</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-green-700 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Messages</span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">5 unread</span>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="mt-auto p-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Your Name</p>
                                <p className="text-xs text-gray-500">Professional</p>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
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
                                    lead={transformLead(lead)}
                                    onClick={() => setSelectedLead(transformLead(lead))}
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
            </div>
        </>
    );
};

const LeadCard = ({ lead, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-gray-900">{lead.name}</h3>
                        <p className="text-sm text-gray-600">{lead.location}</p>
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
                    <div className={`h-2 w-2 rounded-full mr-2 ${lead.status.includes('High') ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm font-medium text-gray-700">{lead.status}</span>
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
    return (
        <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-green-50">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
                            <p className="text-lg text-gray-600">{lead.location}</p>
                        </div>
                        {lead.verified && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Verified Client
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <div className={`h-3 w-3 rounded-full mr-2 ${lead.status.includes('High') ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className="text-lg font-medium text-gray-700">{lead.status}</span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{lead.service}</h3>
                            <p className="text-gray-600">{lead.description}</p>
                        </div>

                        {lead.requested && (
                            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="font-medium text-green-800 mb-1">Client Requested You Specifically</h4>
                                <p className="text-sm text-green-700">This client asked for you by name based on your profile and reviews.</p>
                            </div>
                        )}

                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Service Details</h4>
                            <div className="space-y-2">
                                {Object.entries(lead.details || {})
                                    .filter(([key]) => key !== 'customer' && key !== 'kind')
                                    .map(([key, value]) => (
                                        <p key={key}>
                                            <span className="font-medium capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </span>{' '}
                                            {value}
                                        </p>
                                    ))}

                            </div>
                        </div>

                        {lead.photos && lead.photos.length > 0 && (
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Photos</h4>
                                <div className="flex flex-wrap gap-2">
                                    {lead.photos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={`${API}${photo}`}
                                            alt={`Lead photo ${index + 1}`}
                                            className="h-24 w-24 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Project Budget</p>
                                <p className="font-medium">{lead.credits}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Timeline</p>
                                <p className="font-medium">ASAP</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800">
                            {lead.requested ? 'Already Accepted' : `Accept Lead (${lead.credits})`}
                        </button>
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Back to List
                        </button>
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