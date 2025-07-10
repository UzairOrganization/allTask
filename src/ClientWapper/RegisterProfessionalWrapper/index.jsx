'use client';
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkProviderAuthStatus, registerEmail, registerUser } from "@/redux/slices/authSlice";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Country, State, City } from 'country-state-city';
import { API } from "@/lib/data-service";
import axios from "axios";
import { useMemo } from 'react';
const RegisterProfessionalWrapper = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.auth);

    // Form state
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [servicePostalCode, setServicePostalCode] = useState('');
    const [serviceRadius, setServiceRadius] = useState(200); // Default radius
    // Categories state
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedSubSubcategories, setSelectedSubSubcategories] = useState({});
    // Country-State-City data
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [stateLoading, setStateLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        contactInfo: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        selectedCategories: []
    });




    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API}/api/category/categories`);
                setCategories(response.data);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);



    // Update states when country changes
    const states = useMemo(() => {
        return selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
    }, [selectedCountry]);


    // Update cities when state changes
    const cities = useMemo(() => {
        return selectedState && selectedCountry
            ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
            : [];
    }, [selectedState, selectedCountry]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setStateLoading(true)
        try {
            const result = await axios.post(`${API}/api/service-provider/send-verification-code`, { email });
            console.log(result.data);
            if (result.status === 200) {
                toast.success("Verification code sent!", {
                    description: "Please Check your email",
                    duration: 3000,
                    position: "bottom-left",
                });
                setStateLoading(false)
                setStep(2);
            }
        }
        catch (error) {
            setStateLoading(false)
            toast.error("Failed to send code", {
                description: error?.response?.data?.message || "Please try again later.",
                duration: 3000,
                position: "bottom-left",
            });
        }

    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategories([]);
    };

    const handleSubcategoryToggle = (subcategory) => {
        setSelectedSubcategories(prev => {
            if (prev.includes(subcategory)) {
                // Remove subcategory and its sub-subcategories
                const newSubSubcategories = { ...selectedSubSubcategories };
                delete newSubSubcategories[subcategory];
                setSelectedSubSubcategories(newSubSubcategories);
                return prev.filter(item => item !== subcategory);
            } else {
                // Add subcategory with empty sub-subcategories
                setSelectedSubSubcategories(prev => ({
                    ...prev,
                    [subcategory]: []
                }));
                return [...prev, subcategory];
            }
        });
    };
    const handleSubSubcategoryToggle = (subcategory, subSubcategory) => {
        setSelectedSubSubcategories(prev => {
            const currentSubSubcategories = prev[subcategory] || [];
            const newSubSubcategories = currentSubSubcategories.includes(subSubcategory)
                ? currentSubSubcategories.filter(item => item !== subSubcategory)
                : [...currentSubSubcategories, subSubcategory];

            return {
                ...prev,
                [subcategory]: newSubSubcategories
            };
        });
    };


    const handleAddService = () => {
        const newService = {
            category: selectedCategory,
            postalCode: servicePostalCode,
            serviceRadius: serviceRadius,
            subcategories: selectedSubcategories.map(subcat => ({
                subcategory: subcat,
                subSubcategories: selectedSubSubcategories[subcat] || []
            }))
        };

        setFormData(prev => ({
            ...prev,
            selectedCategories: [...prev.selectedCategories, newService]
        }));

        // Reset selection for next service
        setSelectedCategory('');
        setSelectedSubcategories([]);
        setSelectedSubSubcategories({});
        setServicePostalCode('');
        setServiceRadius(10);
    };


    const handleRemoveService = (index) => {
        setFormData(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.filter((_, i) => i !== index)
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setStateLoading(true)
        try {
            const payload = {
                email,
                verificationCode,
                ...formData,
                selectedCategories: formData.selectedCategories
            };


            const result = await axios.post(`${API}/api/service-provider/service-provider-account-creation`, payload, { withCredentials: true })
            console.log(result);

            if (result.status === 200) {
                toast.success("Registration successful!", {
                    description: "Your account has been created",
                    duration: 3000,
                    position: "bottom-left",
                });
                dispatch(checkProviderAuthStatus())
                setStateLoading(false)
                router.push("/professional-dashboard");
            }
        } catch (error) {
            setStateLoading(false)
            toast.error("Registration failed", {
                description: error?.response?.data?.message || "Please try again.",
                duration: 3000,
                position: "bottom-left",
            });
        }
    };

    const progressValue = (step / 6) * 100;

    return (
        <>
            <Header />
            <Toaster />
            <div className="min-h-[85vh] flex flex-col justify-center items-center bg-gray-50 py-12  sm:px-6 lg:px-8">
                <div className="w-3xl ">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-gray-800">
                                Professional Service Provider Registration
                            </CardTitle>
                            <div className="mt-4">
                                <Progress value={progressValue} className="h-2" />
                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                    <span>Step {step} of 6</span>
                                    <span>
                                        {step === 1 && "Email Verification"}
                                        {step === 2 && "Authenticated Email"}
                                        {step === 3 && "Basic Information"}
                                        {step === 4 && "Country, States, City & Zip code"}
                                        {step === 5 && "Service Details"}
                                        {step === 6 && "Review & Submit"}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {step === 1 && (
                                <form onSubmit={handleEmailSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your professional email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007D63] focus:ring-[#007D63]"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#007D63] hover:bg-[#006a52] text-white py-2 px-4 rounded-md shadow-sm"
                                        disabled={stateLoading}
                                    >
                                        {stateLoading ? "Sending..." : "Send Verification Code"}
                                    </Button>

                                </form>
                            )}
                            {step === 2 && (
                                <>
                                    <div>
                                        <Label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                                            Verification Code
                                        </Label>
                                        <Input
                                            id="verificationCode"
                                            type="text"
                                            placeholder="Enter the 6-digit code"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007D63] focus:ring-[#007D63]"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="flex items-center gap-1"
                                        >
                                            <ChevronLeft className="h-4 w-4" /> Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="bg-[#007D63] hover:bg-[#006a52] text-white flex items-center gap-1"
                                            disabled={!verificationCode}
                                        >
                                            Next <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div>
                                            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Your Full Name/ Company Name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007D63] focus:ring-[#007D63]"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Create a strong password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007D63] focus:ring-[#007D63]"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="contactInfo"
                                                name="contactInfo"
                                                type="tel"
                                                placeholder="+1234567890"
                                                value={formData.contactInfo}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007D63] focus:ring-[#007D63]"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                                Zip Code
                                            </Label>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                type="text"
                                                placeholder="Zip Code"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#007D63] focus:ring-[#007D63]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="flex items-center gap-1"
                                        >
                                            <ChevronLeft className="h-4 w-4" /> Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(4)}
                                            className="bg-[#007D63] hover:bg-[#006a52] text-white flex items-center gap-1"
                                            disabled={!formData.name || !formData.contactInfo || !formData.password || !formData.postalCode}
                                        >
                                            Next <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>

                                </form>
                            )}
                            {step == 4 && (
                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country
                                        </Label>
                                        <Select
                                            onValueChange={(isoCode) => {
                                                const country = Country.getAllCountries().find(c => c.isoCode === isoCode);

                                                setSelectedCountry(country);
                                                setSelectedState(null); // reset state
                                                setFormData(prev => ({
                                                    ...prev,
                                                    country: country.name,
                                                    state: "",
                                                    city: ""
                                                }));
                                            }}
                                            value={selectedCountry?.isoCode || ""}
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px]">
                                                {Country.getAllCountries()
                                                    .filter(country => country.isoCode === 'US' || country.isoCode === 'CA')
                                                    .map((country) => (
                                                        <SelectItem key={country.isoCode} value={country.isoCode}>
                                                            {country.name}
                                                        </SelectItem>
                                                    ))}

                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State/Province
                                        </Label>
                                        <Select
                                            onValueChange={(isoCode) => {
                                                const state = states.find(s => s.isoCode === isoCode);
                                                setSelectedState(state);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    state: state.name,
                                                    city: ""
                                                }));
                                            }}
                                            value={selectedState?.isoCode || ""}
                                            disabled={!selectedCountry}
                                        >

                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Select a state/province" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px]">
                                                {states.map((state) => (
                                                    <SelectItem key={state.isoCode} value={state.isoCode}>
                                                        {state.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </Label>
                                        <Select
                                            onValueChange={(cityName) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    city: cityName
                                                }));
                                            }}
                                            value={formData.city}
                                            disabled={!selectedState}
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Select a city" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px]">
                                                {cities.map((city) => (
                                                    <SelectItem key={city.name} value={city.name}>
                                                        {city.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="flex items-center gap-1"
                                        >
                                            <ChevronLeft className="h-4 w-4" /> Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(5)}
                                            className="bg-[#007D63] hover:bg-[#006a52] text-white flex items-center gap-1"
                                            disabled={!formData.country && !formData.city}
                                        >
                                            Next <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {step === 5 && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700">
                                                Select Service Category
                                            </Label>
                                            <Select onValueChange={handleCategorySelect} value={selectedCategory}>
                                                <SelectTrigger className="mt-1 w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat._id} value={cat.category}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {selectedCategory && (
                                            <div className="space-y-4">
                                                {/* Zip Code Input */}
                                                <div>
                                                    <Label className="block text-sm font-medium text-gray-700">
                                                        Zip Code (Where you'll provide this service)
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        value={servicePostalCode}
                                                        onChange={(e) => setServicePostalCode(e.target.value)}
                                                        placeholder="Enter zip code"
                                                        className="mt-1 w-full"
                                                    />
                                                </div>

                                                {/* Service Radius Input */}
                                                <div>
                                                    <Label className="block text-sm font-medium text-gray-700">
                                                        Service Radius (in miles)
                                                    </Label>
                                                    <Select
                                                        onValueChange={(value) => setServiceRadius(parseInt(value))}
                                                        value={serviceRadius.toString()}
                                                    >
                                                        <SelectTrigger className="mt-1 w-full">
                                                            <SelectValue placeholder="Select service radius" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="5">5 mi</SelectItem>
                                                            <SelectItem value="10">10 mi</SelectItem>
                                                            <SelectItem value="20">20 mi</SelectItem>
                                                            <SelectItem value="30">30 mi</SelectItem>
                                                            <SelectItem value="40">40 mi</SelectItem>
                                                            <SelectItem value="50">50 mi</SelectItem>
                                                            <SelectItem value="60">60 mi</SelectItem>
                                                            <SelectItem value="70">70 mi</SelectItem>
                                                            <SelectItem value="80">80 mi</SelectItem>
                                                            <SelectItem value="90">90 mi</SelectItem>
                                                            <SelectItem value="100">100 mi</SelectItem>
                                                            <SelectItem value="110">110 mi</SelectItem>
                                                            <SelectItem value="120">120 mi</SelectItem>
                                                            <SelectItem value="130">130 mi</SelectItem>
                                                            <SelectItem value="140">140 mi</SelectItem>
                                                            <SelectItem value="150">150 mi</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>


                                            </div>
                                        )}

                                        <Button
                                            type="button"
                                            onClick={handleAddService}
                                            className="bg-[#007D63] hover:bg-[#006a52] text-white"
                                            disabled={!selectedCategory || !servicePostalCode || !serviceRadius}
                                        >
                                            Add Service
                                        </Button>
                                    </div>

                                    {formData.selectedCategories.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-gray-900">Your Services</h3>
                                            <div className="space-y-3">
                                                {formData.selectedCategories.map((service, index) => (
                                                    <div key={index} className="p-4 border rounded-lg">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-medium">{service.category}</h4>
                                                                <div className="mt-1 text-sm text-gray-600">
                                                                    <p>Zip Code: {service.postalCode}</p>
                                                                    <p>Service Radius: {service.serviceRadius} mi</p>
                                                                </div>
                                                                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                                                                    {service.subcategories.map((subcat, i) => (
                                                                        <li key={i}>
                                                                            {subcat.subcategory}
                                                                            {subcat.subSubcategories.length > 0 && (
                                                                                <ul className="ml-4 list-disc list-inside">
                                                                                    {subcat.subSubcategories.map((subSub, j) => (
                                                                                        <li key={j}>{subSub}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleRemoveService(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(2)}
                                            className="flex items-center gap-1"
                                        >
                                            <ChevronLeft className="h-4 w-4" /> Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(6)}
                                            disabled={formData.selectedCategories.length === 0}
                                            className="bg-[#007D63] hover:bg-[#006a52] text-white flex items-center gap-1"
                                        >
                                            Next <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {step === 6 && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900">Review Your Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-700">Personal Information</h4>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                                                    <p><span className="font-medium">Email:</span> {email}</p>
                                                    <p><span className="font-medium">Phone:</span> {formData.contactInfo}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-700">Location</h4>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p><span className="font-medium">Country:</span> {formData.country}</p>
                                                    <p><span className="font-medium">City:</span> {formData.city}</p>
                                                    <p><span className="font-medium">Postal Code:</span> {formData.postalCode}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-medium text-gray-700">Services Offered</h4>
                                            <div className="space-y-3">
                                                {formData.selectedCategories.map((service, index) => (
                                                    <div key={index} className="p-3 border rounded-lg">
                                                        <h5 className="font-medium">{service.category}</h5>
                                                        <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                                                            {service.subcategories.map((subcat, i) => (
                                                                <li key={i}>
                                                                    {subcat.subcategory}
                                                                    {subcat.subSubcategories.length > 0 && (
                                                                        <ul className="list-[circle] list-inside ml-4">
                                                                            {subcat.subSubcategories.map((subsub, j) => (
                                                                                <li key={j}>{subsub}</li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(3)}
                                            className="flex items-center gap-1"
                                        >
                                            <ChevronLeft className="h-4 w-4" /> Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleRegister}
                                            className="bg-[#007D63] hover:bg-[#006a52] text-white"
                                            disabled={stateLoading}
                                        >
                                            {stateLoading ? "Registering..." : "Complete Registration"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div >
        </>
    );
};

export default RegisterProfessionalWrapper;