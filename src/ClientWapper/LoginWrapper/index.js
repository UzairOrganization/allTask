"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser, checkAuthStatus } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { redirect } from 'next/navigation'
import Header from "@/components/Header/index";
import { toast, Toaster } from "sonner";
import Link from "next/link";;
import { API } from "@/lib/data-service";

const LoginWrapper = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        window.location.href = `${API}/auth/google`;  // Corrected assignment
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(credentials));
        if (result.meta.requestStatus === "fulfilled") {

            router.push("/")
        } else {
            toast.error("Login Failed", {
                description: "Invalid credentials. Please try again.",
                duration: 3000, // Auto dismiss after 3 seconds
                position: "bottom-left",
                style: {
                    color: "red", // 🔴 Makes the title red
                    fontWeight: "bold",
                },
            });
        }
    };
    return (
        <>
            <Header />
            <div className="min-h-[80vh] flex flex-col justify-center items-center">
                <div className="mt-12 overflow-hidden flex items-center justify-center">
                    <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg border ">
                        <h1 className="text-3xl font-bold text-center text-black mb-6">
                            Welcome back
                        </h1>
                        <Toaster />
                        {/* Login Form */}
                        <form onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent default Enter behavior
                                            handleLogin(e);
                                        }
                                    }}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent default Enter behavior
                                            handleLogin(e);
                                        }
                                    }}
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember" className={"text-[#007D63]"}>Remember me</Label>
                                </div>
                                < Link href={"/forget-password"}>
                                    <Button variant="link" className="text-sm p-0 h-auto text-[#007D63]">
                                        Forgot password?
                                    </Button>
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button type="submit" className="bg-[#007D63] w-full mb-6 hover:bg-[#47796f] cursor-pointer" disabled={loading}>
                                {loading ? "Logging in..." : "Log in"}
                            </Button>
                        </form>

                        {/* Separator */}
                        <div className="relative mb-6">
                            <Separator />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                                OR
                            </span>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full gap-2" onClick={handleGoogleSignin}>
                                <AiFillGoogleCircle className="w-6 h-6" />
                                Continue with Google
                            </Button>
                            {/* <Button variant="outline" className="w-full gap-2" >
                                <FaFacebook className="w-6 h-6" />
                                Continue with Facebook
                            </Button> */}
                        </div>

                        {/* Terms Notice */}
                        <p className="mt-6 text-xs text-gray-500 text-center">
                            By clicking Continue with Facebook, or Google you agree to the
                            <a href="#" className="underline"> Terms of Use</a> and
                            <a href="#" className="underline"> Privacy Policy</a>.
                            We&apos;ll keep you logged in.
                        </p>
                    </div>
                </div >
                <div className="mt-3">
                    <h3 className="text-center font-semibold"> Don&apos;t have an account? <span className="text-[#007D63]"> <Link href={"/register-email"}> Sign up</Link> </span></h3>
                </div>
            </div>
        </>
    )
}
export default LoginWrapper