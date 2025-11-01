// app/blog/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/page";
import "@/assets/css/homepage.css"
import "../globals.css"
export const metadata = {
    title: "Blogs - Alltasko"
}

export default function BlogPage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto max-w-6xl px-4 py-12 my-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Alltasko Blog</h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Your space for insights, tips, and stories that make life easier, your home better, and your business stronger
        </p>
      </section>

      <section className="mb-16">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Welcome to the Alltasko Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black mb-4">
              Our mission goes beyond connecting service seekers with professionals. We also want to share knowledge that empowers both customers and skilled workers. Whether you're looking for practical home improvement tips, guidance on choosing the right service provider, or business advice for professionals, our blog has something for you.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">For Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black mb-4">
              We know that finding the right professional can feel overwhelming. That's why our blog offers:
            </p>
            <ul className="space-y-3 text-black">
              <li className="flex items-start">
                <span className="text-green-700 font-bold mr-2">•</span>
                <span><strong>How-To Guides</strong> – From fixing small household issues to preparing for major renovations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 font-bold mr-2">•</span>
                <span><strong>Service Selection Tips</strong> – Learn how to choose the right plumber, electrician, carpenter, or cleaner for your needs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 font-bold mr-2">•</span>
                <span><strong>Home Maintenance Checklists</strong> – Seasonal reminders to keep your home in top shape.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">For Professionals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black mb-4">
              If you're a service provider, we share resources to help you grow your business and sharpen your skills:
            </p>
            <ul className="space-y-3 text-black">
              <li className="flex items-start">
                <span className="text-green-700 font-bold mr-2">•</span>
                <span><strong>Marketing Tips</strong> – Learn how to stand out in a competitive market.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 font-bold mr-2">•</span>
                <span><strong>Client Management Advice</strong> – Build strong, long-lasting customer relationships.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 font-bold mr-2">•</span>
                <span><strong>Industry Trends</strong> – Stay updated on tools, technology, and best practices in your trade.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <section className="mb-16 bg-green-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Join the Conversation</h2>
        <p className="text-black mb-6">
          Our blog isn't just about us sharing ideas it's about building a community. We welcome your feedback, topic suggestions, and even guest posts from experienced professionals.
        </p>
        <p className="text-black mb-8">
          Check back regularly for fresh content, success stories, and expert advice. Together, we can make finding and offering services simpler, faster, and more reliable.
        </p>
        
      </section>

      <Separator className="my-12" />

      <footer className="text-center">
        <h3 className="text-2xl font-bold text-green-700">Alltasko</h3>
        <p className="text-black">Connecting you with the right professionals, fast</p>
      </footer>
    </div>
    <Footer/>
    </>
  );
}