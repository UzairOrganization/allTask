'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Smartphone, Menu, X, Backpack } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { logoutUser } from "@/redux/slices/authSlice";
import { API } from "@/lib/data-service";
import axios from 'axios';
import { NotificationDropdownForProvider } from "@/components/ProviderNotifications";

const ProfessionalHeader = () => {
  const pathname = usePathname();
  const { provider } = useSelector(state => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const navItems = [
    { href: "/professional-dashboard", label: "Dashboard" },
    { href: "/leads", label: "Leads" },
    { href: "/chat/professional", label: "Chat" },
    { href: "/forums", label: "Professional Forum" },
    { href: "/help", label: "Help" },
  ];

  // ✅ Fetch Leads & Count Personal Leads
  const fetchLeads = async (id) => {
    try {
      const response = await axios.get(
        `${API}/api/leads/get-all-matching-leads-of-provider/${id}`
      );

      const leads = response.data?.leads || [];

      const yourLeads = leads.filter(lead =>
        lead.serviceProvider && lead.serviceProvider.includes(id)
      );

      setLeadCount(yourLeads.length);

    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  // ✅ Call on provider load
  useEffect(() => {
    if (provider?._id) {
      fetchLeads(provider._id);
    }
  }, [provider]);

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser());
      window.location.href = '/professional-login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="w-full bg-white border-b shadow-lg border-gray-200">
      <div className="w-full p-4 flex justify-between items-center">

        {/* Logo */}
        <div className="logo w-[180px]">
          <Link href="/professional-dashboard">
            <img src="/assets/images/logoMain.png" alt="Logo" className="w-full" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mr-4 items-center gap-6">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">

              <Link
                href={item.href}
                className={`relative text-lg font-medium px-2 transition-colors duration-300 ${
                  pathname === item.href ? "text-[#008b6e]" : "text-gray-800 hover:text-[#008b6e]"
                }`}
              >
                {item.label}

                {/* ✅ Red Badge for Leads */}
                {item.href === "/leads" && leadCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full shadow-md animate-pulse">
                    {leadCount}
                  </span>
                )}
              </Link>

              {pathname === item.href && (
                <span className="absolute bottom-[-34px] left-1/2 transform -translate-x-1/2 h-[3px] w-[120%] bg-green-700" />
              )}
            </div>
          ))}

          <NotificationDropdownForProvider />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full ml-2">
                <Avatar className="h-12 w-12 border-2 border-green-700">
                  {provider?.profilePicture ? (
                    <AvatarImage src={provider.profilePicture} />
                  ) : (
                    <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                      {provider?.name?.charAt(0)?.toUpperCase() || <User />}
                    </AvatarFallback>
                  )}
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 mt-2 shadow-lg rounded-md border">
              <Link href={`/professional/${provider?.name}`}>
                <DropdownMenuItem>View public profile</DropdownMenuItem>
              </Link>

              <Link href={`/purchased-leads`}>
                <DropdownMenuItem>Purchased Leads</DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={logoutHandler} className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 flex flex-col">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-3 text-lg font-medium ${
                  pathname === item.href ? "text-green-700" : "text-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}

                {/* ✅ Mobile Badge */}
                {item.href === "/leads" && leadCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
                    {leadCount}
                  </span>
                )}
              </Link>
            ))}

            <Accordion type="single" collapsible>
              <AccordionItem value="account">
                <AccordionTrigger>My Account</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <Link href={`/professional/${provider?.name}`}>
                    View public profile
                  </Link>
                  <Link href="/purchased-leads">
                    Purchased Leads
                  </Link>
                  <div onClick={logoutHandler} className="text-red-600 cursor-pointer">
                    Logout
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>
      )}
    </header>
  );
};

export default ProfessionalHeader;