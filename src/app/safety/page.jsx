// app/safety/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShieldCheck, User, Users } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Safety - Alltasko"
}


export default function SafetyPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 max-w-6xl my-12">
                <section className="mb-16 text-center">
                    <div className="flex justify-center mb-4">
                        <ShieldCheck className="text-green-700" size={48} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Safety</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Your safety is our top priority in every connection
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Our Safety Commitment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                At Alltasko, your safety is our top priority — whether you're a customer hiring a professional or a service provider taking on a job. We are committed to creating a trusted environment where work can be done confidently, securely, and professionally.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Safety Measures</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <User className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">For Customers</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black mb-4">
                                    We take several steps to help you connect only with verified and reliable professionals:
                                </p>
                                <ul className="space-y-3 text-black mb-6">
                                    <li className="flex items-start">
                                        <span className="text-green-700 font-bold mr-2">•</span>
                                        <span><strong>Profile Verification</strong> – Professionals provide identification, qualifications, and service history</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 font-bold mr-2">•</span>
                                        <span><strong>Customer Reviews</strong> – Read ratings and feedback before hiring</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 font-bold mr-2">•</span>
                                        <span><strong>Direct Communication</strong> – Discuss details before work begins</span>
                                    </li>
                                </ul>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-black mb-2">Safety Tips for Customers:</h3>
                                    <ul className="space-y-2 text-black">
                                        <li className="flex items-start">
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Meet in public or secure locations for first discussions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Keep communication through official channels initially</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Agree on price and scope before work begins</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Users className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">For Professionals</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black mb-4">
                                    We ensure service providers can work confidently:
                                </p>
                                <ul className="space-y-3 text-black mb-6">
                                    <li className="flex items-start">
                                        <span className="text-green-700 font-bold mr-2">•</span>
                                        <span><strong>Genuine Leads</strong> – Only real customer requests</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 font-bold mr-2">•</span>
                                        <span><strong>Transparent Details</strong> – Clear job descriptions before purchasing leads</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 font-bold mr-2">•</span>
                                        <span><strong>Secure Payments</strong> – Discuss terms upfront to avoid disputes</span>
                                    </li>
                                </ul>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-black mb-2">Safety Tips for Professionals:</h3>
                                    <ul className="space-y-2 text-black">
                                        <li className="flex items-start">
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Confirm requirements and address before traveling</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Keep records of all agreements and receipts</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-700 mr-2">•</span>
                                            <span>Trust your instincts if a situation feels unsafe</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Our Shared Commitment</h2>
                    <p className="text-black mb-6 max-w-3xl mx-auto">
                        Safety is a shared responsibility. By following best practices, being transparent, and using our built-in review and verification systems, we can ensure that every connection on Alltasko is safe, respectful, and professional.
                    </p>
                    
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