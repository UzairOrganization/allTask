'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Smartphone, Menu, X, Backpack } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { logoutUser } from "@/redux/slices/authSlice";
import { NotificationDropdownForProvider } from "@/components/ProviderNotifications";

const ProfessionalHeader = () => {
  const pathname = usePathname();
  const { provider } = useSelector(state => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const navItems = [
    { href: "/professional-dashboard", label: "Dashboard" },
    { href: "/leads", label: "Leads" },
    { href: "/my-responses", label: "Chat" },
    { href: "/forums", label: "Professional Forum" },
    { href: "/help", label: "Help" },
  ];

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser())
      window.location.href = '/professional-login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="w-[140px] sm:w-[160px] lg:w-[200px]">
          <Link href="/professional-dashboard">
            <img src="/assets/images/logoMain.png" alt="Logo" className="w-full h-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-base lg:text-lg font-medium px-2 transition-colors duration-300 ${
                pathname === item.href ? "text-green-700" : "text-gray-800 hover:text-green-700"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-green-700 rounded-full" />
              )}
            </Link>
          ))}

          <NotificationDropdownForProvider />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-700">
                <Avatar className="h-10 w-10 border-2 border-green-700">
                  {provider?.profilePicture ? (
                    <AvatarImage src={provider.profilePicture} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                      {provider?.name ? provider.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                    </AvatarFallback>
                  )}
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 mt-2 shadow-lg rounded-md border border-gray-200">
              <Link href={`/professional/${provider?.name}`}>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer">
                  <User className="h-4 w-4 text-green-700" />
                  <span>View public profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href={`/purchased-leads`}>
                <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer">
                  <Backpack className="h-4 w-4 text-green-700" />
                  <span>Purchased Leads</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer">
                <Smartphone className="h-4 w-4 text-green-700" />
                <span>Alltasko App</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logoutHandler}
                className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="px-4 py-3 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 px-2 text-base font-medium border-b border-gray-100 ${
                  pathname === item.href ? "text-green-700" : "text-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Accordion for profile actions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="my-account">
                <AccordionTrigger className="py-3 px-2 flex items-center gap-3 border-b border-gray-100">
                  <Avatar className="h-10 w-10 border-2 border-green-700">
                    {provider?.profilePicture ? (
                      <AvatarImage src={provider.profilePicture} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                        {provider?.name ? provider.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="font-medium">My Account</span>
                </AccordionTrigger>

                <AccordionContent className="py-2 px-2 flex flex-col gap-2">
                  <Link href={`/professional/${provider?.name}`} className="flex items-center gap-3 py-2 text-gray-800 hover:text-green-700">
                    <User className="h-5 w-5" />
                    <span>View public profile</span>
                  </Link>
                  <Link href={`/purchased-leads`} className="flex items-center gap-3 py-2 text-gray-800 hover:text-green-700">
                    <Backpack className="h-5 w-5" />
                    <span>Purchased Leads</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 py-2 text-gray-800 hover:text-green-700">
                    <Smartphone className="h-5 w-5" />
                    <span>Alltasko App</span>
                  </Link>
                  <div onClick={logoutHandler} className="flex items-center gap-3 py-2 text-red-600 hover:text-red-700 cursor-pointer">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </header>
  )
}

export default ProfessionalHeader;
