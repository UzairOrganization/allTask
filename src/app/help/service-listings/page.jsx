// app/guides/how-to-use-alltasko/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
// import "../globals.css"
export const metadata = {
    title: "How to Use Alltasko - Complete Guideline"
}

export default function ServiceListings() {
    return (
        <>
            <Header />
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
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Step-by-Step Guide</h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">1</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Craft a Detailed Description</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Write a clear and concise description of your service.</span>
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Use bullet points to highlight</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Key features</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Benefits</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Example for a cleaning professional</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Deep Cleaning</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Standard Cleaning</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Move-Out Cleaning</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Use keywords that potential clients might search for to improve visibility.</span>
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
                                    <CardTitle className="text-black">Set Clear Pricing</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Specify how you charge for your work.</span>
                                        </div>
                                    </li>

                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Available options include</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Hourly Rate</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Flat Fee per Job</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Custom Quote Required</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>A clear pricing structure helps</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Set expectations</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Reduce back-and-forth communication with clients</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Step 3 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">3</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Upload a Portfolio of Your Work</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Upload high-quality photos and videos of your completed projects.</span>
                                        </div>
                                        
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Benefits</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Serve as a visual portfolio</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Showcase your skills and professionalism</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>You can upload multiple images to a single listing to highlight different aspects of your work.</span>
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
            <Footer />
        </>
    );
}