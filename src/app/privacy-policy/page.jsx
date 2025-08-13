// app/legal/privacy/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Privacy Policy - Alltasko"
}

export default function PrivacyPolicyPage() {


    return (
        <>
            <Header />
            <div className="container mx-auto px-4 max-w-6xl my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Privacy Policy</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Effective Date: 08/14/2025
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Your Privacy Matters</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none text-black">
                                <p className="mb-6">
                                    At Alltasko, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you use our website, mobile application, and related services.
                                </p>
                                <p className="mb-6">
                                    By accessing or using Alltasko, you agree to the practices described in this Privacy Policy.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">1. Information We Collect</h3>
                                <p className="mb-4">We may collect the following types of information:</p>

                                <h4 className="font-semibold mb-2">a. Personal Information (provided by you)</h4>
                                <ul className="list-disc pl-6 mb-4 space-y-1">
                                    <li>Name, email address, phone number, and location</li>
                                    <li>Profile details and service preferences</li>
                                    <li>Payment details (for lead purchases by professionals)</li>
                                </ul>

                                <h4 className="font-semibold mb-2">b. Job Related Information</h4>
                                <ul className="list-disc pl-6 mb-4 space-y-1">
                                    <li>Description of services you request or provide</li>
                                    <li>Photos, documents, or notes related to a posted job</li>
                                </ul>

                                <h4 className="font-semibold mb-2">c. Technical Information</h4>
                                <ul className="list-disc pl-6 mb-6 space-y-1">
                                    <li>IP address, browser type, device information</li>
                                    <li>Cookies and usage data for analytics and performance improvements</li>
                                </ul>

                                <h3 className="text-lg font-bold mt-8 pt-4 mb-4">2. How We Use Your Information</h3>
                                <p className="mb-4">We use your information to:</p>
                                <ul className="list-disc pl-6 mb-6 space-y-1">
                                    <li>Provide and improve our services</li>
                                    <li>Match customers with suitable professionals</li>
                                    <li>Facilitate communication between users</li>
                                    <li>Process payments and transactions</li>
                                    <li>Send important notifications and updates</li>
                                    <li>Maintain platform safety and security</li>
                                </ul>

                                <h3 className="text-lg font-bold mt-8 pt-4 mb-4">3. Sharing Your Information</h3>
                                <p className="mb-4">We may share your information in the following cases:</p>
                                <ul className="list-disc pl-6 mb-6 space-y-1">
                                    <li><strong>With Professionals:</strong> When you post a job, your contact details and job description are shared with interested, verified professionals.</li>
                                    <li><strong>With Customers:</strong> If you're a professional, your profile and service details are visible to potential customers.</li>
                                    <li><strong>With Service Providers:</strong> We may use third party vendors for hosting, analytics, or payment processing.</li>
                                    <li><strong>When Required by Law:</strong> If legally necessary, we may disclose information to government authorities.</li>
                                </ul>

                                <h3 className="text-lg font-bold pt-4 ">4. Data Security</h3>
                                <p className="mb-6">
                                    We implement strict technical and organizational measures to protect your data from unauthorized access, alteration, or destruction. However, no online platform can be completely secure, so we encourage you to take precautions, such as keeping your login credentials confidential.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">5. Data Retention</h3>
                                <p className="mb-6">
                                    We retain your personal information only as long as necessary for operational, legal, and security purposes. You may request deletion of your account at any time.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">6. Your Rights</h3>
                                <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
                                <ul className="list-disc pl-6 mb-4 space-y-1">
                                    <li>Access the personal data we hold about you</li>
                                    <li>Request correction of inaccurate or incomplete information</li>
                                    <li>Request deletion of your data (subject to legal requirements)</li>
                                    <li>Opt out of promotional communications</li>
                                </ul>
                                <p className="mb-6">
                                    You can exercise these rights by contacting our support team.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">7. Cookies and Tracking Technologies</h3>
                                <p className="mb-6">
                                    We use cookies and similar tools to enhance user experience, remember your preferences, and analyze platform performance. You may disable cookies in your browser, but some features may not work correctly.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">8. Third Party Links</h3>
                                <p className="mb-6">
                                    Our platform may contain links to third party websites. We are not responsible for the privacy practices or content of these external sites.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">9. Changes to This Policy</h3>
                                <p className="mb-6">
                                    We may update this Privacy Policy periodically. Any changes will be posted with a revised "Effective Date." Continued use of Alltasko after updates means you accept the changes.
                                </p>

                                <h3 className="text-lg font-bold mt-8 mb-4">10. Contact Us</h3>
                                <p className="mb-2">
                                    If you have questions about this Privacy Policy or how your information is handled, please contact:
                                </p>
                                <ul className="list-disc pl-6 mb-6 space-y-1">
                                    <li>Email: privacy@alltasko.com</li>
                                    <li>Phone: +1 XXX XXXXXXX</li>
                                </ul>

                                <p className="mt-8 font-medium">
                                    Your trust matters to us and we're committed to keeping your data safe, secure, and used only for the purposes you agree to.
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