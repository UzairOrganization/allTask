// app/guides/how-to-use-alltasko/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "How to Use Alltasko - Complete Guideline"
}

export default function HowToUseGuide() {
    return (
        <>
        <Header/>
        <div className="container mx-auto max-w-6xl px-4 my-12">
            <section className="mb-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-green-700">How to Use Alltasko</h1>
                <p className="text-xl text-black max-w-3xl mx-auto">
                    A Step-by-Step Guide for Customers
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
                                <CardTitle className="text-black">Create Your Account</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-20">
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Visit our website or download the Alltasko app</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Click on Sign Up and choose the customer option</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Enter your basic details like name, email, and phone number</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Verify your account so professionals can contact you securely</span>
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
                                <CardTitle className="text-black">Post Your Requirement</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-20">
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Once you're signed in, click Post a Task or Submit Requirement</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Select the service you need (e.g., plumbing, electrical, carpentry, cleaning, etc.)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Describe your job clearly  include location, preferred time, and any special details</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Add photos if needed, so professionals can better understand your requirements</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <p className="text-black font-medium">
                                    <span className="text-green-700 font-bold">Tip:</span> The more details you provide, the faster you'll find the right match.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 3 */}
                    <Card className="border-green-200">
                        <CardHeader className="flex flex-row items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-green-700 font-bold text-xl">3</span>
                            </div>
                            <div>
                                <CardTitle className="text-black">Wait for Professionals to Respond</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-20">
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>After posting, your requirement will be shared with relevant verified professionals in your area</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Only professionals interested in your job will purchase your lead to get your contact details</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>This ensures you receive calls or messages from professionals who are genuinely ready to help</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Step 4 */}
                    <Card className="border-green-200">
                        <CardHeader className="flex flex-row items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-green-700 font-bold text-xl">4</span>
                            </div>
                            <div>
                                <CardTitle className="text-black">Choose the Right Professional</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-20">
                            <p className="text-black mb-4">
                                Once professionals contact you, you can:
                            </p>
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Discuss the details of your job</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Compare pricing, timelines, and experience</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Check reviews and ratings from previous customers</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Choose the one that best fits your needs and budget</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Step 5 */}
                    <Card className="border-green-200">
                        <CardHeader className="flex flex-row items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-green-700 font-bold text-xl">5</span>
                            </div>
                            <div>
                                <CardTitle className="text-black">Get the Job Done</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-20">
                            <p className="text-black mb-4">
                                Once you've agreed on the terms:
                            </p>
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Confirm the booking with the professional</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Be available at the scheduled time</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Inspect the work before making payment</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Step 6 */}
                    <Card className="border-green-200">
                        <CardHeader className="flex flex-row items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-green-700 font-bold text-xl">6</span>
                            </div>
                            <div>
                                <CardTitle className="text-black">Leave a Review</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-20">
                            <p className="text-black">
                                After the job is complete, leave a review on the professional's profile. This helps other customers make informed decisions and rewards great service providers.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="mb-16 bg-green-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-green-700">Why Alltasko Works for You</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                        <CheckCircle className="text-green-700 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-black mb-2">Fast Connections</h3>
                            <p className="text-black">Post your need and start receiving calls quickly.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="text-green-700 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-black mb-2">Trusted Professionals</h3>
                            <p className="text-black">We connect you only with verified service providers.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="text-green-700 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-black mb-2">Your Choice</h3>
                            <p className="text-black">You decide who to hire based on your preferences.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="text-green-700 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-black mb-2">No Extra Fees</h3>
                            <p className="text-black">You only pay the professional for the work.</p>
                        </div>
                    </div>
                </div>
                <p className="text-black mt-6">
                    Alltasko is here to save you time, reduce stress, and make getting things done effortless.
                </p>
                <Button className="mt-6 bg-green-700 hover:bg-green-800">
                    Post your requirement today
                </Button>
            </section>

            <Separator className="my-12" />

            <footer className="text-center">
                <h3 className="text-2xl font-bold text-green-700">Alltasko</h3>
                <p className="text-black">Your Job, Our Connection.</p>
            </footer>
        </div>
        <Footer/>
        </>
    );
}