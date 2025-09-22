'use client'
import { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    WorkflowIcon,
    MessageCircle,
    LogOut,
    User,
} from "lucide-react"
import { RiArrowDropDownLine } from "react-icons/ri";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { logoutUser } from "@/redux/slices/authSlice";
import { Button } from "../ui/button";
import { NotificationDropdown } from "../Notification";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    
    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await dispatch(logoutUser())
        location.reload()
    }
    
    const storeCustomServiceInLocalStorage = () => {
        const category = {
            category: "Custom Request",
            subcategory: null,
            subSubcategory: null
        }
        const availableProviders = []
        try {
            localStorage.setItem('categoryHierarchy', JSON.stringify(category));
            localStorage.setItem('availableProviders', JSON.stringify(availableProviders));
        }
        catch (e) {
            console.error("Error saving data to localStorage", e);
        }
        window.location.href = "/service-request"
    }
    
    return (
        <header className={`bg-white w-full border-b shadow-lg sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-0'}`}>
            <div className="w-[95%] max-w-7xl mx-auto p-2 md:p-3 flex justify-between items-center">
                {/* Logo */}
                <div className="logo w-[140px] md:w-[180px] lg:w-[210px]">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <img src="/assets/images/logoMain.png" alt="Alltasko" className="w-full" />
                    </Link>
                </div>

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3">

                    {isAuthenticated ? (
                        <>
                            <div 
                                className="btn-box theme-btn btn-two cursor-pointer text-sm lg:text-base py-1.5 px-3"
                                onClick={storeCustomServiceInLocalStorage}
                            >
                                Request a Service
                            </div>

                            <div className="border p-1 rounded-full">
                                <NotificationDropdown />
                            </div>

                            <div className="flex items-center">
                                <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="profile" />
                                    <AvatarFallback>
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <RiArrowDropDownLine size={30} color="black" className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <DropdownMenuLabel className="p-1">My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={"/user-profile"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1 cursor-pointer">
                                                    <User className="h-4 w-4 mr-2" />
                                                    <span>Profile</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={"/user-requests"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1">
                                                    <WorkflowIcon className="h-4 w-4 mr-2" />
                                                    <span>All Requests</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={"/user-chat"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1">
                                                    <MessageCircle className="h-4 w-4 mr-2" />
                                                    <span>Chats</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="p-1 cursor-pointer text-red-600 focus:text-red-600"
                                            onClick={() => setOpen(true)}
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/service"
                                className="flex text-sm lg:text-base font-semibold items-center text-black hover:text-green-700 transition-colors px-2 py-1"
                            >
                                EXPLORE
                            </Link>
                            <Link
                                href="/login"
                                className="flex text-sm lg:text-base font-semibold items-center text-black hover:text-green-700 transition-colors px-2 py-1"
                            >
                                LOGIN &nbsp;<CiLogin size={18} className="ml-1" />
                            </Link>

                            <div className="btn-box mx-1">
                                <Link href="/professional-login" className="theme-btn btn-two text-xs lg:text-sm py-1.5 px-2 lg:px-3">
                                    Join as Pro
                                </Link>
                            </div>

                            <div 
                                className="btn-box theme-btn btn-two cursor-pointer text-xs lg:text-sm py-1.5 px-2 lg:px-3"
                                onClick={storeCustomServiceInLocalStorage}
                            >
                                Request Service
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button - Visible only on mobile */}
                <button
                    className="md:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                {/* Mobile Menu - Slides in from right */}
                <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    ></div>
                    <div className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div className="logo w-[120px]">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <img src="/assets/images/logoMain.png" alt="Alltasko" className="w-full" />
                                </Link>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100"
                                aria-label="Close menu"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        <div className="space-y-1">
                            {isAuthenticated ? (
                                <>
                                    <div 
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                                        onClick={() => {
                                            storeCustomServiceInLocalStorage();
                                            setMobileMenuOpen(false);
                                        }}
                                    >
                                        Request a Service
                                    </div>
                                    <Link
                                        href="/user-profile"
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/user-requests"
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        All Requests
                                    </Link>
                                    <Link
                                        href="/user-chat"
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Chats
                                    </Link>
                                    <div
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                                        onClick={() => {
                                            setOpen(true);
                                            setMobileMenuOpen(false);
                                        }}
                                    >
                                        Log out
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/service"
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        EXPLORE
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        LOGIN
                                    </Link>
                                    <Link
                                        href="/professional-login"
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Join as Professional
                                    </Link>
                                    <div 
                                        className="block py-3 px-4 font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                                        onClick={() => {
                                            storeCustomServiceInLocalStorage();
                                            setMobileMenuOpen(false);
                                        }}
                                    >
                                        Request a Service
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Logout Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-[95%] sm:max-w-md p-4 sm:p-6">
                        <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                                Are you sure?
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600 mt-2">
                                This will log you out of your Alltasko account.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                            <Button
                                onClick={() => setOpen(false)}
                                className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-md"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}