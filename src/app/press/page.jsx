// app/press/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Press - Alltasko"
}
export default function PressPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 py-12 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Press</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Your source for Alltasko news, media resources, and official updates
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Welcome to the Alltasko Press Center</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black mb-4">
                                At Alltasko, we're on a mission to transform how people find and hire skilled professionals. Our platform connects service seekers with trusted experts for everything from plumbing and electrical work to carpentry, painting, and more.
                            </p>
                            <p className="text-black">
                                We believe our story is one worth sharing. Whether you're a journalist, blogger, or content creator, this page is designed to help you understand who we are, what we do, and why it matters.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-green-700">For Media Inquiries</h2>
                            <p className="text-black mb-6">
                                If you'd like to feature Alltasko in your publication or need an official comment from our team, please reach out to:
                            </p>
                            <div className="flex items-center mb-6">
                                <span className="text-2xl mr-3">📧</span>
                                <span className="text-black font-medium">press@alltasko.com</span>
                            </div>
                            <p className="text-black mb-4">
                                We're happy to provide:
                            </p>
                            <ul className="space-y-2 text-black">
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Press releases and official announcements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Interviews with our leadership team</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>High-resolution logos, images, and brand assets</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-700 mr-2">•</span>
                                    <span>Background information on our platform and services</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-green-700">Our Media Story</h2>
                            <p className="text-black mb-4">
                                Alltasko was founded with a simple vision: to connect people to the right professional faster than ever before. With our easy-to-use platform, we've streamlined the way customers find services and the way professionals find clients.
                            </p>
                            <p className="text-black">
                                In a short span of time, we've built a growing community of service providers and customers who trust Alltasko for speed, transparency, and quality connections. Our focus is not just on technology, but on creating real opportunities for skilled workers while solving everyday problems for customers.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Press Releases & Coverage</h2>
                    <Card className="py-12">
                        <CardContent className="text-center">
                            <p className="text-black text-lg">
                                Here, we'll share links to our latest press releases, interviews, and news features as they happen.
                            </p>
                            <p className="text-black mt-4">
                                (Check back soon for updates.)
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Brand Guidelines</h2>
                    <p className="text-black mb-6">
                        For consistency in coverage, please follow our brand usage guidelines. Logos, imagery, and approved descriptions can be shared upon request.
                    </p>
                    <Button className="bg-green-700 hover:bg-green-800">
                        Request Brand Assets
                    </Button>
                </section>

                <Separator className="my-12" />

                <footer className="text-center">
                    <h3 className="text-2xl font-bold text-green-700">Alltasko</h3>
                    <p className="text-black">Connecting you with the right professionals, fast</p>
                </footer>
            </div>
            <Footer />
        </>
    );
}