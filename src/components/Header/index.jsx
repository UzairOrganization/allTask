'use client'
import { useState } from "react";
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

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
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
            console.error("Error saving data to localStorage", err);
        }
        window.location.href = "/service-request"
    }
    return (
        <header className="bg-white w-full border-b shadow-lg">
            <div className="w-[95%] mx-auto p-3 flex justify-between items-center">
                {/* Logo */}
                <div className="logo w-[210px]">
                    <Link href="/">
                        <img src="/assets/images/logoMain.png" alt="" className="w-full" />
                    </Link>
                </div>

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-3">
                   
                    {isAuthenticated ? (
                        <>
                            <div className="btn-box theme-btn btn-two cursor-pointer" onClick={storeCustomServiceInLocalStorage}>
                                Request a Service

                            </div>

                            <div className="border p-1 rounded-full">
                                <Avatar className="cursor-pointer p-1">
                                    <AvatarImage src="/assets/images/notification.png" alt="notifications" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="flex">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <RiArrowDropDownLine size={30} color="black" className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" style={{ marginTop: 12 }}>
                                        <DropdownMenuLabel className="p-1">My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={"/user-profile"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1 cursor-pointer">
                                                    <User />
                                                    <span className="ml-2">
                                                        Profile
                                                    </span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={"/user-requests"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1">
                                                    <WorkflowIcon />
                                                    <span className="ml-2">All Requests</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={"/user-chat"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1">
                                                    <MessageCircle />
                                                    <span className="ml-2">Chats</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="p-1 cursor-pointer" onClick={() => setOpen(true)}>
                                            <LogOut />
                                            <span className="ml-2 cursor-pointer" >Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="flex text-lg font-semibold items-center text-black hover:text-green-700"
                            >
                                LOGIN &nbsp;<CiLogin size={22} className="ml-1" />
                            </Link>

                            <div className="btn-box">
                                <Link href="/professional-login" className="theme-btn btn-two">
                                    Join as Professional
                                </Link>
                            </div>

                            <div className="btn-box theme-btn btn-two cursor-pointer" onClick={storeCustomServiceInLocalStorage}>
                                Request a Service

                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button - Visible only on mobile */}
                <button
                    className="md:hidden p-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Mobile Menu - Slides in from right */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                        <div className="absolute right-0 top-0 h-full w-3/4 bg-white shadow-lg p-4 overflow-y-auto">
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* <div className="border-b pb-2">
                                    <div
                                        className="flex items-center font-semibold text-lg text-black"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        EXPLORE &nbsp; <FaChevronDown size={16} />
                                    </div>
                                </div> */}

                                {isAuthenticated ? (
                                    <>
                                        <a
                                            href="index.html"
                                            className="block py-2 font-semibold text-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Request a Service
                                        </a>
                                        <Link
                                            href="/user-profile"
                                            className="block py-2 font-semibold text-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/user-requests"
                                            className="block py-2 font-semibold text-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            All Requests
                                        </Link>
                                        <div
                                            className="block py-2 font-semibold text-lg cursor-pointer"
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
                                            href="/login"
                                            className="block py-2 font-semibold text-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            LOGIN
                                        </Link>
                                        <Link
                                            href="/professional-login"
                                            className="block py-2 font-semibold text-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Join as Professional
                                        </Link>
                                        <a
                                            href="index.html"
                                            className="block py-2 font-semibold text-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Request a Service
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Logout Dialog - Same for all screens */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="bg-[#dddddd] rounded-xl border-none shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-[14px] text-left text-black  p-3 font-semibold" style={{ fontSize: 24 }}>Are you sure?</DialogTitle>
                            <DialogDescription className="text-sm text-gray-700 pl-3" style={{ marginTop: -16 }}>
                                This action cannot be undone. This will logout your account from Alltasko.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4 flex justify-end gap-2 m-3">
                            <Button
                                onClick={() => setOpen(false)}
                                className="bg-white text-black hover:bg-black hover:text-white border border-gray-300 shadow-sm px-4 py-2 transition " style={{ borderRadius: 5 }}
                            >
                                Close
                            </Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition" style={{ backgroundColor: "red", borderRadius: 5 }} onClick={handleLogout}
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