import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Settings, User, Wallet, Rocket, CalendarCheck, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Help Center - Alltasko",
};

const HelpPage = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: <Rocket className="w-6 h-6 text-[#008b6e]" />,
      description: "New to AllTasko? Start here",
      topics: ["Account setup", "Profile completion", "First steps"],
      urls: ["/help/account-setup", "/help/profile-completion", "/help/first-steps"],
    },
    {
      title: "For Professionals",
      icon: <User className="w-6 h-6 text-[#008b6e]" />,
      description: "Tools for service providers",
      topics: ["Service listings", "Client management", "Payments"],
      urls: ["/help/service-listings", "/help/client-management", "/help/payments"],
    },
    {
      title: "Account & Settings",
      icon: <Settings className="w-6 h-6 text-[#008b6e]" />,
      description: "Manage your preferences",
      topics: ["Profile management", "Notifications", "Security"],
      urls: ["/help/profile-management", "/help/notifications", "/help/security"],
    },
    {
      title: "Payments & Pricing",
      icon: <Wallet className="w-6 h-6 text-[#008b6e]" />,
      description: "Financial questions",
      topics: ["Pricing structure", "Payment methods", "Refunds"],
      urls: ["/help/pricing-structures", "/help/payment-methods", "/help/refunds"],
    },
  ];

  const popularArticles = [
    {
      title: "How to get your first booking",
      icon: <CalendarCheck className="w-5 h-5 mr-2 text-[#008b6e]" />,
      url: "/help/how-to-get-your-first-booking",
    },
    {
      title: "Setting up secure payments",
      icon: <Wallet className="w-5 h-5 mr-2 text-[#008b6e]" />,
      url: "/help/setting-up-secure-payments",
    },
    {
      title: "Managing your service calendar",
      icon: <CalendarCheck className="w-5 h-5 mr-2 text-[#008b6e]" />,
      url: "/help/managing-your-service-calender",
    },
    {
      title: "Writing great service descriptions",
      icon: <MessageSquare className="w-5 h-5 mr-2 text-[#008b6e]" />,
      url: "/help/writing-great-service-description",
    },
  ];

  return (
    <>
      <ProfessionalHeader />

      <div className="container max-w-6xl mx-auto px-4 py-8 my-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#008b6e]">
            How can we help you today?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to all your AllTasko questions or contact our support team
          </p>

          <div className="mt-8 max-w-2xl mx-auto relative">
  {/* <input
    type="text"
    placeholder="Search help articles..."
    className="w-full pl-12 pr-4 py-3 text-base border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
  />
  <svg
    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-700 pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg> */}
</div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-green-100">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {category.icon}
                  <div>
                    <CardTitle className="text-[#008b6e]">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-6">
                  {category.topics.map((topic, i) => (
                    <li key={i}>
                      <Link
                        href={category.urls[i]}
                        target="_blank"
                        className="text-sm hover:text-[#008b6e] cursor-pointer transition-colors"
                      >
                        
                        {topic}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-[#008b6e]">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href={article.url}
                className="border rounded-lg p-4 hover:bg-green-50 transition-colors cursor-pointer border-green-200 flex items-center"
              >
                {article.icon}
                <span className="font-medium text-[#008b6e]">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        {/* <div className="bg-green-50 rounded-xl p-8 text-center border border-green-200">
          <div className="max-w-2xl mx-auto">
            <LifeBuoy className="w-12 h-12 mx-auto text-green-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-green-700">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is ready to assist you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="gap-2 bg-green-700 hover:bg-green-800">
                <MessageSquare className="w-4 h-4" />
                Live Chat
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-green-700 border-green-700 hover:bg-green-50"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HelpPage;
