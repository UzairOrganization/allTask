'use client'

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Mail, Home, MapPin, Phone } from 'lucide-react';

const StageThree = ({ finalFormData, formData, setFormData, next, back }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        address: '',
        zipCode: '',
        contactPreference: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            // Pre-fill with user data if authenticated
            setCustomerDetails({
                name: user.name || '',
                email: user.email || '',
                address: user.address || '',
                zipCode: user.zipCode || '',
                contactPreference: user.contactPreference || ''
            });
        }
        setIsLoading(false);
        
    }, [isAuthenticated, user]);

    // Check form validity whenever customerDetails changes
    useEffect(() => {
        const isValid = (
            customerDetails.name &&
            customerDetails.email &&
            customerDetails.address &&
            customerDetails.zipCode &&
            customerDetails.contactPreference
        );
        setIsFormValid(isValid);
    }, [customerDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;


        if (!isFormValid) return;
        // For authenticated users, include the user ID
        const updatedFormData = {
            ...formData,  // Preserve all existing form data
            customerDetails: {
                ...customerDetails,
            },
            ...(isAuthenticated && user && { customer: user._id })  // Add user ID if authenticated
        };
        finalFormData.append("customerDetails[name]", customerDetails.name)
        finalFormData.append("customerDetails[email]", customerDetails.email)
        finalFormData.append("customerDetails[address]", customerDetails.address)
        finalFormData.append("customerDetails[zipCode]", customerDetails.zipCode)
        finalFormData.append("customerDetails[contactPreference]", customerDetails.contactPreference)
        isAuthenticated && finalFormData.append("customer", user._id)
        setFormData(updatedFormData)
        next();

    };

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <Card className="shadow-lg overflow-hidden border border-gray-100">
                <CardHeader className="bg-[#00725A] p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                        {isAuthenticated ? 'Confirm Your Details' : 'Enter Your Contact Information'}
                    </h2>
                </CardHeader>
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-[#00725A]" />
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={customerDetails.name}
                                    onChange={handleChange}
                                    required
                                    className="focus:ring-[#00725A] focus:border-[#00725A]"
                                    disabled={isAuthenticated}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-[#00725A]" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={customerDetails.email}
                                    onChange={handleChange}
                                    required
                                    className="focus:ring-[#00725A] focus:border-[#00725A]"
                                    disabled={isAuthenticated}
                                />
                            </div>

                            {/* Address Field */}
                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2">
                                    <Home className="h-4 w-4 text-[#00725A]" />
                                    Street Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={customerDetails.address}
                                    onChange={handleChange}
                                    required
                                    className="focus:ring-[#00725A] focus:border-[#00725A]"
                                />
                            </div>

                            {/* Zip Code Field */}
                            <div className="space-y-2">
                                <Label htmlFor="zipCode" className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#00725A]" />
                                    ZIP Code
                                </Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    value={customerDetails.zipCode}
                                    onChange={handleChange}
                                    required
                                    className="focus:ring-[#00725A] focus:border-[#00725A]"
                                />
                            </div>

                            {/* Contact Preference */}
                            <div className="space-y-2">
                                <Label htmlFor="contactPreference" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[#00725A]" />
                                    Preferred Contact Method
                                </Label>
                                <Select
                                    value={customerDetails.contactPreference}
                                    onValueChange={(value) =>
                                        setCustomerDetails(prev => ({
                                            ...prev,
                                            contactPreference: value
                                        }))
                                    }
                                    required
                                >
                                    <SelectTrigger className="w-full focus:ring-[#00725A] focus:border-[#00725A]">
                                        <SelectValue placeholder="Select contact method" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectItem value="Call">Phone Call</SelectItem>
                                        <SelectItem value="SMS">Text Message (SMS)</SelectItem>
                                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                                        <SelectItem value="Email">Email</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between pt-4">
                            <Button
                                type="button"
                                onClick={back}
                                variant="outline"
                                className="px-4 py-2 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                className="px-4 py-2 text-sm bg-[#00725A] hover:bg-[#00634A] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* For unauthenticated users */}
            {!isAuthenticated && (
                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <a href="/login" className="ml-1 text-[#00725A] hover:underline">
                        Sign in to autofill your details
                    </a>
                </div>
            )}
        </div>
    );
};

export default StageThree;