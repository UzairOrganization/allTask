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

export default function ManagingYourServiceCalender() {
    return (
        <>
            <ProfessionalHeader />
            <div className="container mx-auto max-w-6xl px-4 my-12">
                <section className="mb-16">
                    <h2 className="text-4xl font-bold mb-8 text-center text-green-700">Managing Your Service Calender</h2>

                    <div className="space-y-8">

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Sync with Your Calendar</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Easily sync your Alltasko calendar with your Google Calendar, Outlook, or other external calendars. This helps you avoid double bookings and see all your commitments in one place.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Set Your Availability</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Clearly mark the days and hours you are available for work. You can set recurring weekly availability or block off specific days for vacations or appointments.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Automate Client Booking</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Allow clients to book available time slots directly from your profile, reducing the need for back-and-forth communication.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Send Reminders</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    Our system can automatically send reminders to clients about upcoming appointments, helping to reduce no-shows.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardTitle className="text-black text-2xl">Reschedule or Cancel</CardTitle>
                            </div>
                            <div className="pl-20 mt-5">
                                <p className="space-y-2 text-black text-lg">
                                    You can easily reschedule or cancel bookings directly from your calendar. Our system will automatically notify the client of any changes.
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