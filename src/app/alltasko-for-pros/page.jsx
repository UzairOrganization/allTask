// app/professionals/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Alltasko for Professionals"
}

export default function ProfessionalsPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Alltasko for Pros</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Your gateway to finding quality leads and growing your business
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Welcome to Alltasko for Professionals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                Whether you're a freelancer, small business owner, or large service provider, Alltasko connects you with customers actively looking for your services. Manage leads, grow your client base, and run your business all in one place.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Why Join Alltasko?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Quality Leads Delivered to You</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Instead of chasing clients, we bring them to you. Our platform matches customer leads based on location, service category, and expertise, saving you time and increasing your success rate.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Grow Your Business Efficiently</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Focus on what you do best while we handle client acquisition. Our system helps you convert more leads into paying customers with less effort.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Getting Started</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-green-700 font-bold text-xl">1</span>
                                </div>
                                <CardTitle className="text-center text-black">Create Your Account</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-black">
                                    Sign up as a service provider and enter your business details and service categories.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-green-700 font-bold text-xl">2</span>
                                </div>
                                <CardTitle className="text-center text-black">Complete Your Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-black">
                                    Add photos, descriptions, skills, and testimonials to build trust with potential clients.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-green-700 font-bold text-xl">3</span>
                                </div>
                                <CardTitle className="text-center text-black">Set Cost Estimates</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-black">
                                    Provide pricing information to attract serious inquiries and set clear expectations.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Managing Leads & Jobs</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-black">Receiving Leads</h3>
                            <ul className="space-y-4 text-black">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-700 mr-3 mt-1 flex-shrink-0" />
                                    <span>Get notifications for matching job requests in your area</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-700 mr-3 mt-1 flex-shrink-0" />
                                    <span>Review complete job details before responding</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-700 mr-3 mt-1 flex-shrink-0" />
                                    <span>Message customers directly to discuss requirements</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-black">Job Management</h3>
                            <ul className="space-y-4 text-black">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-700 mr-3 mt-1 flex-shrink-0" />
                                    <span>Track all active jobs from your dashboard</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-700 mr-3 mt-1 flex-shrink-0" />
                                    <span>Maintain complete work history and records</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-700 mr-3 mt-1 flex-shrink-0" />
                                    <span>Centralize all customer communications</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Building Your Reputation</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Customer Reviews</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Positive ratings improve your visibility and help you stand out. After completing jobs, encourage satisfied clients to leave feedback.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Showcase Your Work</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Upload portfolio images, case studies, or before-and-after shots to demonstrate your expertise and quality.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Tips for Success</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black text-center">Respond Promptly</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-center">
                                    Quick responses increase your chances of winning jobs
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black text-center">Be Transparent</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-center">
                                    Clear pricing and honest timelines build trust
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black text-center">Showcase Quality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-center">
                                    Highlight your best work to attract better clients
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black text-center">Stay Active</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-center">
                                    Regular activity improves your lead matching
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Start Growing Your Business Today</h2>
                    <p className="text-black mb-8 max-w-3xl mx-auto">
                        Alltasko is your partner in business growth. We connect you with real customers, help manage your jobs, and boost your credibility so you can focus on delivering exceptional service.
                    </p>
                    <Button className="bg-green-700 hover:bg-green-800 px-8 py-4 text-lg">
                        Sign Up Now
                    </Button>
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