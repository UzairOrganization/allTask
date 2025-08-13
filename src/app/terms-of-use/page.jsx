// app/legal/terms/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Terms of Use - Alltasko"
}

export default function TermsOfUsePage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 max-w-6xl my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Terms of Use</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Last Updated: 8/14/2025
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Alltasko Terms of Use</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none text-black">
                                <p className="mb-6">
                                    Welcome to Alltasko. By accessing or using our website, mobile app, or services, you agree to comply with and be bound by the following Terms of Use. Please read them carefully.
                                </p>

                                <h3 className="text-lg font-bold mt-6 mb-3">1. Services Provided</h3>
                                <p className="mb-6">
                                    Alltasko connects customers with independent service professionals for various tasks such as plumbing, electrical work, cleaning, and more. We are a facilitator, not an employer, contractor, or agent of any service provider.
                                </p>

                                <h3 className="text-lg font-bold mt-6 mb-3">2. User Responsibilities</h3>
                                <ul className="list-disc pl-6 mb-6 space-y-4">
                                    <li><strong>Accurate Information</strong> – You agree to provide truthful, complete, and up-to-date details when creating an account or posting a job.</li>
                                    <li><strong>Lawful Use</strong> – You will not use Alltasko for illegal, harmful, or fraudulent purposes.</li>
                                    <li><strong>Respectful Communication</strong> – Interactions with other users must remain professional and courteous.</li>
                                </ul>

                                <h3 className="text-lg font-bold mt-8 mb-3">3. Professional Responsibilities</h3>
                                <p className="mb-6">
                                    Service providers must ensure the accuracy of their profiles, qualifications, and pricing. Any work accepted through Alltasko must be carried out with professionalism and in compliance with local laws.
                                </p>

                                <h3 className="text-lg font-bold mt-6 mb-3">4. Payments and Fees</h3>
                                <ul className="list-disc pl-6 mb-6 space-y-2">
                                    <li>Customers pay professionals directly for services rendered.</li>
                                    <li>Professionals may pay a fee to access customer leads.</li>
                                    <li>Alltasko is not responsible for disputes over payment amounts or terms between users.</li>
                                </ul>

                                <h3 className="text-lg font-bold mt-6 mb-3">5. Limitation of Liability</h3>
                                <p className="mb-6">
                                    Alltasko is not liable for damages, losses, or disputes arising from services provided by professionals or the actions of any user.
                                </p>

                                <h3 className="text-lg font-bold mt-6 mb-3">6. Changes to Terms</h3>
                                <p className="mb-6">
                                    We may update these Terms of Use at any time. Continued use of our platform means you accept the revised terms.
                                </p>

                                <p className="mt-6 font-medium">
                                    By using Alltasko, you acknowledge that you have read, understood, and agreed to these Terms of Use.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
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