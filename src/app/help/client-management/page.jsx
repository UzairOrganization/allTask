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

export default function ClientManagement() {
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
                                    <CardTitle className="text-black">Respond to Inquiries Promptly</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>When a client posts a task that matches your service listing, you’ll receive a notification.</span>
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Respond quickly to inquiries because it</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Shows professionalism</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Increases your chances of being hired</span>
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
                                    <CardTitle className="text-black">Track Your Projects</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Your professional dashboard provides a comprehensive overview of your projects.</span>
                                        </div>
                                    </li>

                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>You can view the status of each job, including</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Initial lead</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Ongoing progress</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Final payment</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Everything is managed in one place for convenience.</span>
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
                                    <CardTitle className="text-black">Communicate Effectively</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pl-20">
                                <ul className="space-y-2 text-black">
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>The Alltasko platform includes a secure messaging system.</span>
                                        </div>

                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Use it to communicate directly with clients.</span>
                                        </div>
                                        
                                    </li>
                                    <li className="flex flex-col items-start">
                                        <div>
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>You can</span>
                                        </div>
                                        <div className="my-2 ml-6">
                                            <ul className="space-y-2 text-black">
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Discuss job details</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Confirm appointments</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Send progress updates</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-700 mr-2">•</span>
                                                    <span>Answer client questions</span>
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