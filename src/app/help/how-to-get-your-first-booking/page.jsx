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

export default function HowToGetYourFirstBooking() {
    return (
        <>
            <ProfessionalHeader />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16">
                    <h2 className="text-4xl font-bold mb-8 text-center text-green-700">How To Get Your First Booking</h2>

                    <div className="space-y-8">

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Optimize Your Profile</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    A complete profile is key. Make sure your bio is compelling, your portfolio is full of high-quality photos, and your service areas are clearly defined. A professional profile builds trust with potential clients.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Set Competitive Prices</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Research what other professionals in your area are charging for similar services. Consider offering a special introductory rate to attract your first few clients.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Respond Quickly to Leads</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    The faster you respond to a new job request, the higher your chances of getting the job. Try to respond within a few hours, if possible.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Send a Personalized Message</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    When you respond to a lead, go beyond a generic template. Mention specific details from the client's request to show that you've read it carefully and are a good fit for their needs.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Request Reviews</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    After you complete your first job, kindly ask the client to leave a review. Positive reviews are essential for building a strong reputation and attracting more bookings.
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
            {/* <Footer /> */}
        </>
    );
}