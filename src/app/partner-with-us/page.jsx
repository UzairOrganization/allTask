// app/partner-with-us/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"

export const metadata = {
    title: "Partner With Us"
}

export default function PartnerWithUsPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 py-12 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Partner with Us</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Grow Your Business with Alltasko
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Why Join Alltasko?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-4">
                                If you are a skilled professional looking to reach more customers, increase your income, and focus on what you do best, Alltasko is the platform for you. We connect you directly with people who are actively looking for your services — no endless searching, no wasted time, and no complicated marketing.
                            </p>
                            <p className="text-black">
                                With Alltasko, you can receive genuine leads, decide which ones to pursue, and grow your client base on your own terms.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Benefits of Partnering with Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="flex items-center">
                                    <div className="p-2 rounded-full bg-green-100 mr-4">
                                        <Check className="text-green-700" />
                                    </div>
                                    <CardTitle className="text-black">Grow Your Income</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Access a steady stream of potential clients in your area.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="flex items-center">
                                    <div className="p-2 rounded-full bg-green-100 mr-4">
                                        <Check className="text-green-700" />
                                    </div>
                                    <CardTitle className="text-black">Save Time</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Spend less time searching for work and more time completing jobs.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="flex items-center">
                                    <div className="p-2 rounded-full bg-green-100 mr-4">
                                        <Check className="text-green-700" />
                                    </div>
                                    <CardTitle className="text-black">Choose Your Leads</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Pay only for the leads you want to pursue.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="flex items-center">
                                    <div className="p-2 rounded-full bg-green-100 mr-4">
                                        <Check className="text-green-700" />
                                    </div>
                                    <CardTitle className="text-black">Build Your Reputation</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Receive reviews from satisfied customers and strengthen your profile.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="flex items-center">
                                    <div className="p-2 rounded-full bg-green-100 mr-4">
                                        <Check className="text-green-700" />
                                    </div>
                                    <CardTitle className="text-black">No Long-Term Commitments</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Work as much or as little as you want.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">How It Works for Professionals</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 1</Badge>
                                <CardTitle className="text-black">Sign Up</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Create your Alltasko professional account in minutes. Provide details about your services, skills, and location.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 2</Badge>
                                <CardTitle className="text-black">Get Matched with Leads</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    When a customer posts a job related to your skills, you'll receive the lead details.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 3</Badge>
                                <CardTitle className="text-black">Purchase the Lead</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    If you're interested, purchase the lead to unlock the customer's contact information.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 4</Badge>
                                <CardTitle className="text-black">Complete the Work</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Deliver quality service, get paid directly by the customer, and earn great reviews.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Who Can Partner with Us?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Plumbers</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Electricians</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Carpenters</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Painters</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Cleaners</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Landscapers</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Handymen</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">HVAC Technicians</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                    <p className="text-center mt-6 text-black">...and many more skilled professionals</p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Join in 3 Easy Steps</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">1</Badge>
                                <CardTitle className="text-black">Register Online</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Fill out our simple sign-up form with your basic information.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">2</Badge>
                                <CardTitle className="text-black">Get Verified</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Submit necessary documents to confirm your identity and services.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">3</Badge>
                                <CardTitle className="text-black">Start Receiving Leads</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Begin choosing and working on jobs right away.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-700">Your Success is Our Goal</h2>
                    <p className="text-black max-w-3xl mx-auto mb-8">
                        We are committed to creating a win-win environment for professionals. By partnering with Alltasko, you're joining a growing network of skilled workers who are building stronger, more profitable businesses through better connections with customers.
                    </p>
                    <button className="px-8 py-4 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition text-lg">
                        Sign up today and start getting real leads tomorrow
                    </button>
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