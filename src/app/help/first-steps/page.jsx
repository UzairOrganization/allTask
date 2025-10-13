// app/guides/how-to-use-alltasko/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
// import "../globals.css"
export const metadata = {
    title: "How to Use Alltasko - Complete Guideline"
}

export default function FirstSteps() {
    return (
        <>
            <ProfessionalHeader />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">New to AllTasko? Start here</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        A Step-by-Step Guide
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Getting Started with Alltasko</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-4">
                                At Alltasko, we've made it easier than ever to find the right professional for any job  whether it's fixing a leaky tap, rewiring your lights, painting a room, or getting your garden in shape. Our platform is designed to be simple, fast, and reliable, so you can go from "I need help" to "Job done" in just a few steps.
                            </p>
                            <p className="text-black">
                                This guide will walk you through exactly how to use Alltasko as a customer.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Step-by-Step Guide For Customers</h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">1</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Post a Task</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>To get help quickly, click "Post a Task".</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Provide a detailed description of the job.</span>
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Include specifics such as</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Location</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Preferred date and time</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Budget (if available)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>The more details you provide, the faster professionals can give accurate quotes.</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">2</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Browse Services</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>If unsure what you need, explore service categories.</span>
                                        </div>
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Browse listings from various professionals.</span>
                                        </div>
                                    </li>

                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Discover a wide range of services in your area, such as:</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Home repairs</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Creative projects</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </li>


                                </ul>
                            </CardContent>
                        </Card>
                        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Step-by-Step Guide For Professionals</h2>
                        {/* Step 1 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">1</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Create Your First Service Listing</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Go to your dashboard and select "Create a New Listing."</span>
                                        </div>

                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Fill in the required details</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Service name (e.g., Emergency Plumbing, Interior Painting)</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Detailed description of what the service includes</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Pricing model</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">2</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Set Your Availability</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Use the built-in calendar to set your working hours and days.</span>
                                        </div>

                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>This helps potential clients</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Know when you’re available</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Avoid booking conflicts</span>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>


                    </div>
                </section>



                <Separator className="my-12" />

                <footer className="text-center">
                    <h3 className="text-2xl font-bold text-green-700">Alltasko</h3>
                    <p className="text-black">Your Job, Our Connection.</p>
                </footer>
            </div>
            {/* <Footer /> */}
        </>
    );
}