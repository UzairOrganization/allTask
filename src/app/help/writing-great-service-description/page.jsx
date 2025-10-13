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

export default function WritingGreatServiceDescription() {
    return (
        <>
            <ProfessionalHeader />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16">
                    <h2 className="text-4xl font-bold mb-8 text-center text-green-700">Writing Great Service Descriptions</h2>

                    <div className="space-y-8">

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Be Clear and Specific</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    A great service description leaves no room for confusion. Instead of a general term, use precise language that tells the client exactly what to expect. For example, rather than "gardening," specify "Weekly lawn mowing and edging service with optional hedge trimming." This clarity helps attract the right clients who are specifically looking for your services.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Highlight Your Experience</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Your experience is your biggest asset. Don't just mention years of experience; highlight specific qualifications, certifications, or specialized training you've received. Did you work for a major company or have a specific apprenticeship? Mentioning this builds credibility and trust. For instance, "I've been a licensed plumber for 10 years and specialize in residential water heater installation."
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Use Bullet Points</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Organize your description with bullet points to make it easy to read. Most clients are quickly scanning your page for key information. Bullet points allow them to find what they're looking for, such as a list of services, pricing tiers, or a brief summary of what's included in a package, without getting lost in a dense paragraph.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Showcase Value</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Focus on how your service benefits the client, not just what it is. A client isn't just buying a service; they're buying a solution to a problem. For example, instead of saying, "I repair leaky faucets," you could say, "I'll fix your leaky faucet to save you money on your water bill and prevent water damage." Framing your services this way shows that you understand their needs and can provide real value.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Include a Call to Action</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    A strong call to action (CTA) tells the client exactly what to do next. It's an invitation to engage. Instead of just ending your description, use a clear and friendly prompt like, "Ready to get started? Send me a message for a free quote!" or "View my portfolio and let's discuss your project." This guides the client toward making a booking.
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