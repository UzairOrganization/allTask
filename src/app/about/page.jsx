// app/about/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "About Alltasko"
}
export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 py-12 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">About Alltasko</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Connecting You with the Right Professionals, Fast
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-4">
                                In today's busy world, finding the right person to do the right job at the right time can feel harder than it should. Whether it's fixing a leaky faucet, repairing an electrical fault, assembling new furniture, painting your home, or taking care of urgent maintenance work, the struggle is real.
                            </p>
                            <p className="text-black">
                                That's where Alltasko comes in. We are a modern, easy-to-use online platform that connects people who need a service with skilled professionals who can get the job done. Think of us as the bridge between your requirements and the experts who can fulfill them  quickly, reliably, and transparently.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">How Alltasko Works</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 1</Badge>
                                <CardTitle className="text-black">Post Your Requirement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    As a customer, you simply submit your request through our website or app. The more details you provide, the better we can connect you to the right professional.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 2</Badge>
                                <CardTitle className="text-black">We Share Your Request</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Your request is shared with relevant, verified professionals in your area. They can see a brief overview of your job requirement.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 3</Badge>
                                <CardTitle className="text-black">Professionals Purchase the Lead</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Interested service providers purchase the lead to get your contact details. This ensures you only hear from professionals who are genuinely interested.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <Badge variant="outline" className="mx-auto mb-4 text-green-700 border-green-700">Step 4</Badge>
                                <CardTitle className="text-black">You Connect and Get the Job Done</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    The professional reaches out to you directly. You discuss your requirements, agree on the terms, and get your work done  fast and hassle-free.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Why Alltasko Exists</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">For Customers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>Access to a wide pool of professionals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>Quick response to urgent needs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>Choice and control over who you hire</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>No need to waste time searching endlessly</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">For Professionals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-black">
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>Steady stream of genuine leads</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>Pay only for leads you choose</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>More time spent working, less time finding work</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-700 mr-2">✓</span>
                                        <span>Grow your reputation and client base</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Our Core Values</h2>
                    <div className="grid md:grid-cols-5 gap-4">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Trust</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    We prioritize connecting users with genuine, verified professionals.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Simplicity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    Our process is straightforward, with no unnecessary complexity.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Opportunity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    We help professionals find more clients and grow their income.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Speed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    We make the connection process quick so urgent jobs can be handled right away.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle className="text-black">Transparency</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm">
                                    No hidden charges, no unfair practices  everyone knows how the system works.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Who Can Use Alltasko?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Customers / Service Seekers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black mb-4">
                                    Anyone who needs a job done  big or small. This includes:
                                </p>
                                <ul className="space-y-2 text-black">
                                    <li>• Homeowners needing repairs or installations</li>
                                    <li>• Offices requiring maintenance services</li>
                                    <li>• Businesses seeking specialized tasks</li>
                                    <li>• Event organizers needing on-demand support</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black">Service Providers / Professionals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black mb-4">
                                    Any skilled individual or business offering services, such as:
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-black">
                                    <span>• Plumbers</span>
                                    <span>• Electricians</span>
                                    <span>• Carpenters</span>
                                    <span>• Painters</span>
                                    <span>• Cleaners</span>
                                    <span>• HVAC Technicians</span>
                                    <span>• Landscapers</span>
                                    <span>• General Handymen</span>
                                    <span className="col-span-2">• ...and more</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-2xl text-green-700">Safety and Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                We understand that letting someone into your home or office requires trust. That's why we're committed to:
                            </p>
                            <ul className="mt-4 space-y-2 text-black">
                                <li>• Verifying professional details</li>
                                <li>• Encouraging customer reviews and ratings</li>
                                <li>• Maintaining a transparent feedback system so future customers can make informed choices</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">The Story Behind the Name "Alltasko"</h2>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-black">
                            The name reflects exactly what we do  All Tasks. Whether it's a small household fix, a large renovation project, or a one-time specialized job, Alltasko is your go-to platform for getting it done. The "-ko" at the end adds a modern, catchy twist, making the name easy to remember and unique in the market.
                        </p>
                    </div>
                </section>

                <section className="mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-700">Our Vision</h2>
                    <p className="text-black max-w-3xl mx-auto">
                        We see a future where finding help for any task is as easy as ordering food online. With the growth of digital tools and smartphone access, we believe every customer should be able to connect with the right professional within minutes, and every skilled worker should have consistent opportunities to earn.
                    </p>
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-700">Join the Alltasko Community</h2>
                    <p className="text-black mb-8 max-w-3xl mx-auto">
                        Whether you need a quick fix or a long-term service partner, Alltasko is your one-stop solution.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition">
                        <a href="/">
                            Customers – Post your requirement today
                        </a>
                        </button>
                        <button className="px-6 py-3 bg-white text-green-700 border border-green-700 rounded-lg font-medium hover:bg-green-50 transition">
                           <a href="/professional-login">
                           Professionals – Sign up to receive quality leads
                            </a> 
                        </button>
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