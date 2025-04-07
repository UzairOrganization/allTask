'use client'
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
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
    const { isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleLogout = async () => {
        await dispatch(logoutUser())
        location.reload()
    }
    return (
        <header className="bg-white w-screen border-black shadow-md">
            <div className="w-[96%] m-auto p-3 justify-between flex">
                <div className="logo w-[20%]">
                    <a href="/">
                        <img src="assets/images/logoMain.png" alt="" className="w-[150px]" />
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    {/* EXPLORE (Always visible) */}
                    <div
                        className="relative cursor-pointer flex items-center font-semibold text-lg text-black hover:text-green-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        EXPLORE &nbsp; <FaChevronDown size={16} className="ml-1" />
                        {isOpen && (
                            <div className="absolute w-[180px] font-normal top-8 left-0 bg-white shadow-md rounded-md p-3">
                                <ul className="space-y-2">
                                    <li className="hover:text-green-700">Option 1</li>
                                    <li className="hover:text-green-700">Option 2</li>
                                    <li className="hover:text-green-700">Option 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Authenticated: Show profile, notification */}
                    {isAuthenticated ? (
                        <>
                            <div className="btn-box">
                                <a href="index.html" className="theme-btn btn-two">
                                    Request a Service
                                </a>
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
                                            <a href={"/user-profile"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1 cursor-pointer">
                                                    <User />
                                                    <span className="ml-2">
                                                        Profile
                                                    </span>
                                                </DropdownMenuItem>
                                            </a>
                                            <a href={"/user-requests"} className="text-black cursor-pointer">
                                                <DropdownMenuItem className="p-1">
                                                    <WorkflowIcon />
                                                    <span className="ml-2">All Requests</span>
                                                </DropdownMenuItem>
                                            </a>
                                            <DropdownMenuItem className="p-1">
                                                <MessageCircle />
                                                <span className="ml-2">Chats</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="p-1 cursor-pointer" onClick={() => setOpen(true)}>
                                            <LogOut />
                                            <span className="ml-2 cursor-pointer" >Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogContent className="bg-[#dddddd] rounded-xl border-none shadow-xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-[14px] text-left text-black  p-3 font-semibold" style={{ fontSize: 24 }}>Are you sure?</DialogTitle>
                                        <DialogDescription className="text-sm text-gray-700 p-1" style={{ marginTop: -13 }}>
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
                        </>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="flex text-lg font-semibold items-center text-black hover:text-green-700"
                            >
                                LOGIN &nbsp;<CiLogin size={22} className="ml-1" />
                            </a>

                            <div className="btn-box">
                                <a href="index.html" className="theme-btn btn-two">
                                    Join as Professional
                                </a>
                            </div>

                            <div className="btn-box">
                                <a href="index.html" className="theme-btn btn-two">
                                    Request a Service
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header >
    );
}
