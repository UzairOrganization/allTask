// app/careers/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Careers At Alltasko"
}
export default function CareersPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 py-12 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Careers at Alltasko</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Join our mission to connect people with the right professionals
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-4">
                                At Alltasko, we believe in building more than just a platform  we're building a community that connects people, empowers professionals, and makes life easier for everyone.
                            </p>
                            <p className="text-black">
                                Our mission is simple but powerful: to bridge the gap between service seekers and skilled professionals. We're passionate about creating technology that simplifies everyday challenges while opening up real opportunities for people to grow their businesses and achieve financial independence.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Why Work With Us?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Impact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Every project you work on helps real people solve real problems.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Innovation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    We embrace new ideas and creative problem-solving.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Growth</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    We encourage learning and provide opportunities to expand your skills.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Culture</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    We maintain a collaborative, respectful, and inclusive environment.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Flexibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    We understand the importance of work-life balance.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Our Culture</h2>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-black mb-6">
                            We're a small but passionate team, and we thrive on collaboration. Everyone has a voice at Alltasko, and we believe great ideas can come from anywhere  whether you're in development, design, marketing, or operations.
                        </p>
                        <p className="text-black">
                            We encourage experimentation, take smart risks, and learn from failures just as much as from successes. Most importantly, we celebrate wins together and support each other in challenges.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">What We Look For</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Driven & Self-Motivated</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Open to Feedback</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Creative Problem-Solvers</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Team Players</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Passionate About Tech</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Open Positions</h2>
                    <div className="max-w-2xl mx-auto text-center">
                        <Card className="py-12">
                            <CardContent>
                                <p className="text-black text-lg mb-6">
                                    Currently, we do not have any open positions.
                                </p>
                                <p className="text-black">
                                    When opportunities become available, they will be listed here.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-700">Join Our Talent Community</h2>
                    <p className="text-black max-w-3xl mx-auto mb-8">
                        If you'd like to be considered for future roles, feel free to send us your resume and a short introduction at careers@alltasko.com. We'll keep your details on file and reach out if a suitable position opens up.
                    </p>

                </section>

                <section className="mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-700">Join Us in Shaping the Future</h2>
                    <p className="text-black max-w-3xl mx-auto">
                        Alltasko is growing quickly, and we're just getting started. If you're looking for a place where your work truly matters, where innovation is encouraged, and where you can help change the way people connect with services, we'd love to hear from you.
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