// app/support/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Help - Alltasko"
}

export default function SupportPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Support</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        We're here to help you every step of the way
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Welcome to Alltasko Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                Whether you're a customer looking for the right professional or a service provider connecting with new clients, our support team is ready to make your experience smooth, simple, and stress-free.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">How We Can Help</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Account Assistance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Sign-up, login, and profile setup help
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Posting Requirements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Guidance on submitting your job or service request
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Lead Purchases</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Help for professionals on purchasing and managing leads
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Payments & Billing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Clarifying costs, charges, and payment processes
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Technical Issues</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Fixing glitches, errors, or app/website problems
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">General Inquiries</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Any other questions about using Alltasko
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Contact Us</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <Mail className="text-green-700" size={24} />
                                </div>
                                <CardTitle className="text-black">Email</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black font-medium">
                                    support@alltasko.com
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <Phone className="text-green-700" size={24} />
                                </div>
                                <CardTitle className="text-black">Phone</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black font-medium">
                                    +1-XXX-XXXXXXX
                                </p>
                                <p className="text-black text-sm mt-2">
                                    Available 9 AM – 6 PM
                                </p>
                            </CardContent>
                        </Card>
                        {/* <Card className="text-center">
                            <CardHeader>
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <MessageSquare className="text-green-700" size={24} />
                                </div>
                                <CardTitle className="text-black">Live Chat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Available on our website and mobile app
                                </p>
                            </CardContent>
                        </Card> */}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Help Center</h2>
                    <Card className="border-green-200">
                        <CardHeader>
                            <CardTitle className="text-black">Self-Service Resources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-4">
                                Before reaching out, visit our Help Center for quick answers to common questions. Our Help Center contains:
                            </p>
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Step-by-step guides</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Troubleshooting tips</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Tutorials for customers and professionals</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Our Promise</h2>
                    <p className="text-black mb-6">
                        We aim to respond to all queries as quickly as possible. Your time matters, and we know that many of the tasks posted on Alltasko are urgent. That's why we prioritize fast, clear, and effective solutions.
                    </p>
                    {/* <div className="text-center">
                        <Button className="bg-green-700 hover:bg-green-800">
                            Need help now? Contact us today
                        </Button>
                    </div> */}
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