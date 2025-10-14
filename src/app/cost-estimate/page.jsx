// app/guides/cost-estimates/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Cost Estimate - Alltasko"
}
export default function CostEstimatesPage() {
    return (
        <>
            <Header />

            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Cost Estimates</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Transparent pricing to help you make informed decisions
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Understanding Cost Estimates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                At Alltasko, we believe in transparency so you can make informed decisions before hiring a professional. That's why, when you submit a job request, you can easily view the estimated cost for each service directly from the professional's profile.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">How It Works</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Step 1 */}
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-green-700 font-bold text-xl">1</span>
                                </div>
                                <CardTitle className="text-black">Submit Your Requirement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Post your job by describing the service you need</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Include location, urgency, and specific requirements</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Step 2 */}
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-green-700 font-bold text-xl">2</span>
                                </div>
                                <CardTitle className="text-black">View Professional Profiles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black mb-2">Each profile includes:</p>
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Service categories they offer</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Ratings and reviews</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Estimated costs for services</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Step 3 */}
                        <Card className="border-green-200">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-green-700 font-bold text-xl">3</span>
                                </div>
                                <CardTitle className="text-black">Compare and Choose</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Check estimates from different professionals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Find one that fits your budget</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Remember these are estimates - final price may vary</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <Card className="border-green-200">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Why Cost Estimates Matter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h3 className="font-bold text-black mb-2">Transparency</h3>
                                    <p className="text-black">No hidden surprises later</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-2">Better Budgeting</h3>
                                    <p className="text-black">Plan your expenses before committing</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-black mb-2">Smart Choices</h3>
                                    <p className="text-black">Compare options easily to get the best value</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-6">
                    <div className="flex">
                        <Info className="text-green-700 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-black mb-2">Important Tip</h3>
                            <p className="text-black">
                                Always discuss the final price with the professional before work begins to ensure clarity and avoid misunderstandings.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16 text-center">
                    <p className="text-black text-lg mb-6">
                        With Alltasko's cost estimate feature, you're always in control of your spending and your service choice.
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