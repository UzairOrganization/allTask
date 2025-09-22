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

export default function SettingUpSecurePayments() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16">
                    <h2 className="text-4xl font-bold mb-8 text-center text-green-700">Setting Up Secure Payments</h2>

                    <div className="space-y-8">

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Link Your Bank Account</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    To get paid, you'll need to securely link your bank account to your Alltasko profile. We use a trusted third-party payment processor to ensure your financial information is protected.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Payment Frequency</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    You can choose how often you want to receive payments from completed jobs—for example, weekly, bi-weekly, or monthly.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Invoice Generation</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Our system automatically generates professional invoices for every job. You and the client can view and track payments directly in the app.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Dispute Resolution</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    In the event of a payment dispute, our support team can help you resolve the issue fairly and quickly. We have a clear process to ensure both professionals and clients are protected.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Transaction History</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    All of your payment and transaction history is stored in your account, allowing you to easily track your earnings for tax purposes or personal records.
                                </p>
                            </div>
                        </div>
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