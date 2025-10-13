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

export default function Notifications() {
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
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Step-by-Step Guide</h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <span className="text-green-700 font-bold text-xl">1</span>
                                </div>
                                <div>
                                    <CardTitle className="text-black">Turn Notifications On/Off</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Choose to receive alerts for new job requests, client messages, and other account activity.</span>
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
                                    <CardTitle className="text-black">Email Notifications</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span> Receive updates directly in your inbox for important actions.</span>
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
                                    <CardTitle className="text-black">Push Notifications</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Get real-time alerts on your mobile device when a new lead is available or a client messages you.</span>
                                        </div>
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
                                    <CardTitle className="text-black">Customization</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span> Tailor your notification settings to receive alerts only for the types of information you care about.</span>
                                        </div>
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
                                    <CardTitle className="text-black">Notification History</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span> Review all recent notifications in one convenient place within your account.</span>
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