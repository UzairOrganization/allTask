// app/resources/home-resource-center/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Home Resource Center - Alltasko"
}

export default function HomeResourceCenter() {
    return (
        <>
            <Header />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-700">Home Resource Center</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Your hub for tips, guides, and expert advice on home maintenance
                    </p>
                </section>

                <section className="mb-16">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Welcome to the Alltasko Home Resource Center</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-black">
                                Whether you're looking to tackle small maintenance tasks yourself or understand when it's best to call in a professional, this section is designed to help you make smart, informed decisions.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-green-700">For Homeowners & Renters</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">DIY Guides</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Step by step instructions for simple repairs and upgrades
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Maintenance Checklists</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Seasonal reminders to keep your home safe and functional year round
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Energy Saving Tips</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Advice on reducing utility bills and making your home more eco friendly
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="text-black">Safety Tips</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">
                                    Guidance on avoiding common household hazards
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">When to Call a Professional</h2>
                    <p className="text-black mb-6">
                        Not all home tasks should be DIY. Our resource center helps you identify situations where hiring a skilled professional is the safest, most cost effective choice.
                    </p>
                    <p className="text-black">
                        From electrical rewiring to plumbing installations, we guide you on when expert help is essential.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Learn from the Experts</h2>
                    <p className="text-black mb-6">
                        We regularly feature insights from verified professionals in the Alltasko network. Their expertise can help you:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-black">
                                    Choose the right materials for your projects
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-black">
                                    Understand common repair costs
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-black">
                                    Plan renovations more effectively
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16 bg-green-50 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Stay Updated</h2>
                    <p className="text-black mb-6 max-w-3xl mx-auto">
                        Our Home Resource Center is continuously updated with fresh tips, new how to articles, and trends in home care. Whether you're a first time homeowner or an experienced renovator, there's always something new to learn here.
                    </p>
                    <Button className="bg-green-700 hover:bg-green-800">
                        Explore Resources
                    </Button>
                </section>

                <section className="mb-16 text-center">
                    <p className="text-black text-lg">
                        Your home is your biggest investment and Alltasko is here to help you protect, improve, and enjoy it.
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