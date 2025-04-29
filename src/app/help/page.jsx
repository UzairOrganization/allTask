import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LifeBuoy, Settings, User, Wallet, Rocket, Wrench, CalendarCheck, MessageSquare } from "lucide-react"

export const metadata = {
    title: "Help Center - Alltasko"
}
const HelpPage = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: <Rocket className="w-6 h-6 text-green-700" />,
      description: "New to AllTasko? Start here",
      topics: ["Account setup", "Profile completion", "First steps"]
    },
    {
      title: "For Professionals",
      icon: <User className="w-6 h-6 text-green-700" />,
      description: "Tools for service providers",
      topics: ["Service listings", "Client management", "Payments"]
    },
    {
      title: "For Customers",
      icon: <User className="w-6 h-6 text-green-700" />,
      description: "Help for clients",
      topics: ["Finding services", "Booking process", "Reviews"]
    },
    {
      title: "Account & Settings",
      icon: <Settings className="w-6 h-6 text-green-700" />,
      description: "Manage your preferences",
      topics: ["Profile management", "Notifications", "Security"]
    },
    {
      title: "Payments & Pricing",
      icon: <Wallet className="w-6 h-6 text-green-700" />,
      description: "Financial questions",
      topics: ["Pricing structure", "Payment methods", "Refunds"]
    },
    {
      title: "Troubleshooting",
      icon: <Wrench className="w-6 h-6 text-green-700" />,
      description: "Solve common issues",
      topics: ["Common issues", "Contact support", "Status page"]
    }
  ]

  const popularArticles = [
    {
      title: "How to get your first booking",
      icon: <CalendarCheck className="w-5 h-5 mr-2 text-green-700" />
    },
    {
      title: "Setting up secure payments",
      icon: <Wallet className="w-5 h-5 mr-2 text-green-700" />
    },
    {
      title: "Managing your service calendar",
      icon: <CalendarCheck className="w-5 h-5 mr-2 text-green-700" />
    },
    {
      title: "Writing great service descriptions",
      icon: <MessageSquare className="w-5 h-5 mr-2 text-green-700" />
    }
  ]

  return (
    <>
      <ProfessionalHeader />
      
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700">How can we help you today?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to all your AllTasko questions or contact our support team
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto relative">
            <Input 
              placeholder="Search help articles..." 
              className="pl-12 py-6 text-base border-green-300 focus:ring-green-500 focus:border-green-500"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-green-100">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {category.icon}
                  <div>
                    <CardTitle className="text-green-700">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc">
                  {category.topics.map((topic, i) => (
                    <li key={i} className="text-sm hover:text-green-700 cursor-pointer transition-colors">
                      {topic}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-green-700">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 hover:bg-green-50 transition-colors cursor-pointer border-green-200"
              >
                <div className="flex items-center">
                  {article.icon}
                  <span className="font-medium text-green-800">{article.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-green-50 rounded-xl p-8 text-center border border-green-200">
          <div className="max-w-2xl mx-auto">
            <LifeBuoy className="w-12 h-12 mx-auto text-green-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-green-700">Still need help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is ready to assist you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="gap-2 bg-green-700 hover:bg-green-800">
                <MessageSquare className="w-4 h-4" />
                Live Chat
              </Button>
              <Button variant="outline" className="gap-2 text-green-700 border-green-700 hover:bg-green-50">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpPage