'use client'
import * as React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Edit, Info } from "lucide-react"
import { ServicesContainer } from "./ServiceContainer";
export function ProfessionalOnboarding() {
    const [dateTime, setDateTime] = useState("");
    const { provider } = useSelector(state => state.auth);
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const dayName = now.toLocaleString("en-US", { weekday: "long" });
            const day = now.getDate();
            const month = now.toLocaleString("en-US", { month: "short" });

            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const ampm = hours >= 12 ? " pm" : " am";

            hours = hours % 12 || 12;

            setDateTime(`${dayName}, ${day} ${month} ${hours}:${minutes}${ampm}`);
        };

        updateTime(); // call immediately
        const interval = setInterval(updateTime, 60000); // update every minute

        return () => clearInterval(interval); // cleanup on unmount
    }, []);
    return (
        <div className="w-full my-4 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Hello, {provider?.name}!</h1>
                <p className="text-gray-500">{dateTime}</p>
            </div>

            <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-2">Welcome to Our Platform, {provider?.name}</h3>
                <p className="text-green-700">
                    We're excited to help you grow your business. Here's how it works:
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-left font-medium">1. Customers tell us what they need</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-gray-600">
                        Customers answer specific questions about their requirements, helping us match you with the most relevant opportunities.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-left font-medium">2. We send you matching leads</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-gray-600">
                        You receive leads that match your preferences instantly by email and on the app, so you never miss an opportunity.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-left font-medium">3. You choose leads you like</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-gray-600">
                        Review leads and select those that fit your business. Get customer contact details right away for the leads you choose.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-left font-medium">4. You contact the customer</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-gray-600">
                        Reach out directly to the customer to discuss their needs and provide your services. Build your client base with qualified leads.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-left font-medium">4. You get hired.</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 text-gray-600">
                        There's no commission and nothing more to pay.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Overview</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Profile Completion */}
                    <Card className="border border-gray-200 rounded-lg shadow-sm">
                        <CardHeader className="border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Profile Status</h2>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-600 mb-2">Your profile is 97% complete</p>
                                    <Progress value={97} className="h-2 bg-gray-200" />
                                </div>
                                <p className="text-gray-700">
                                    Completing your profile is a great way to appeal to customers
                                </p>
                                <Button variant="outline" className="border-green-700 text-green-700">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Starter Pack Offer */}
                    <Card className="border rounded-lg shadow-sm bg-green-50 border-green-100">
                        <CardHeader className="border-b border-green-200">
                            <h2 className="text-xl font-semibold text-gray-800">GET STARTED PACK OFFER</h2>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg">Starter pack offer</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Respond to up to 10 customers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>20% OFF and a get hired guarantee</span>
                                    </li>
                                </ul>
                                <Button className="bg-green-700 hover:bg-green-800">
                                    <Info className="mr-2 h-4 w-4" />
                                    More info
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Services Section */}
                    {/* <Card className="border border-gray-200 rounded-lg shadow-sm">
                        <CardHeader className="border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Services</h2>
                            <p className="text-gray-600 text-sm">You'll receive leads in these categories</p>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Mobile Software Development</span>
                                    <Badge variant="outline" className="text-green-700 border-green-700">
                                        Active
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div>
                                        <h3 className="font-medium">Software Testing</h3>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">
                                        +15
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                    <ServicesContainer/>

                    {/* Locations Section */}
                    <Card className="border border-gray-200 rounded-lg shadow-sm">
                        <CardHeader className="border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Locations</h2>
                            <p className="text-gray-600 text-sm">You're receiving customers within</p>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Nationwide</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Ilford</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leads Overview */}
                    {/* <Card className="border border-gray-200 rounded-lg shadow-sm lg:col-span-2">
                        <CardHeader className="border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Leads Overview</h2>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <p className="text-gray-600">Estimated leads per day</p>
                                <h3 className="text-2xl font-bold text-green-700">97</h3>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600">Sending new leads to</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">hamza.hashm@devocra.com</span>
                                    <Button variant="link" className="text-green-700 p-0 h-auto">
                                        Change
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600">Unread leads</p>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-bold">82</h3>
                                    <Button variant="outline" className="border-green-700 text-green-700">
                                        View
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}

                    

                    {/* Response Rate */}
                    <Card className="border border-gray-200 rounded-lg shadow-sm lg:col-span-2">
                        <CardHeader className="border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Response Rate</h2>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-gray-600">Estimated 87 leads per day</p>
                                    <p className="text-gray-700">You haven't responded to any leads yet.</p>
                                </div>
                                <Button variant="outline" className="border-green-700 text-green-700">
                                    View responses
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}