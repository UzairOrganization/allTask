// app/legal/data-usage/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, CreditCard, Settings, BarChart, LucideKey } from "lucide-react";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
import { Button } from "@/components/ui/button";
export const metadata = {
    title: "How We Use Your Data - Alltasko"
}

export default function DataUsagePage() {

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 max-w-6xl my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">How We Use Your Data</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Transparency in how we handle your personal information
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Our Data Commitment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                At Alltasko, we believe in being transparent about how your personal information is collected, stored, and used. Our goal is to ensure your data is handled responsibly, securely, and only for purposes that benefit your experience on our platform.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Key Uses of Your Data</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Settings className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">1. To Provide Our Services</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    We use the details you provide  such as your name, contact information, and job requirements  to connect you with the most suitable professionals. For professionals, we use your service details and profile information to showcase your expertise to potential customers.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 2 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <BarChart className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">2. To Improve Your Experience</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Your data helps us tailor recommendations, refine search results, and improve our matchmaking process between customers and professionals. We analyze activity trends to make Alltasko faster, easier, and more relevant for you.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 3 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Bell className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">3. To Communicate with You</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black mb-2">
                                    We may use your contact details to send:
                                </p>
                                <ul className="space-y-1 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Job alerts and updates on your posted tasks</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Notifications when a professional shows interest in your job</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">•</span>
                                        <span>Important announcements about service improvements or policy changes</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Card 4 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Shield className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">4. For Safety and Security</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Your data is used to verify user accounts, detect fraudulent activity, and maintain the integrity of our platform. This ensures both customers and professionals can interact in a safe environment.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 5 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <CreditCard className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">5. For Payments and Transactions</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    If you are a professional purchasing leads, your payment details are processed securely by trusted third-party payment providers.
                                </p>
                            </CardContent>
                        </Card>
                        {/* Card 6 */}
                        <Card className="border-green-200">
                            <CardHeader className="flex flex-row items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <LucideKey className="text-green-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-black">6. For Service Quality Assurance</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Alltasko ensures quality by reviewing feedback and ratings, connecting customers with trusted, skilled professionals.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Our Promise to You</h2>
                    <p className="text-black mb-6 max-w-3xl mx-auto">
                        We never sell your personal information to third parties. Your trust is important to us, and we are committed to using your data only to enhance your Alltasko experience.
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