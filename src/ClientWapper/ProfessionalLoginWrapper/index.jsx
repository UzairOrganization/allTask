"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import axios from "axios";
import Header from "@/components/Header/index";
import { API } from "@/lib/data-service";
import { useDispatch } from "react-redux";
import { checkProviderAuthStatus } from "@/redux/slices/authSlice";

const ProfessionalLoginWrapper = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API}/api/service-provider/login-service-provider`, credentials, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Login Successful", {
                    description: "You are being redirected to your dashboard",
                    duration: 3000,
                    position: "bottom-left",
                });
                dispatch(checkProviderAuthStatus())
                // Redirect to professional dashboard after successful login
                router.push("/professional-dashboard");

            }
        } catch (error) {
            let errorMessage = "Login Failed";

            if (error.response) {
                // The request was made and the server responded with a status code
                switch (error.response.status) {
                    case 400:
                        errorMessage = error.response.data.error || "Invalid credentials";
                        break;
                    case 404:
                        errorMessage = "User not found";
                        break;
                    case 500:
                        errorMessage = "Server error. Please try again later.";
                        break;
                    default:
                        errorMessage = "An error occurred during login";
                }
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No response from server. Please check your connection.";
            } else {
                // Something happened in setting up the request
                errorMessage = "Error setting up request";
            }

            toast.error(errorMessage, {
                description: "Please try again",
                duration: 3000,
                position: "bottom-left",
                style: {
                    color: "red",
                    fontWeight: "bold",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Toaster />
            <div className="min-h-screen md:min-h-[80vh] flex flex-col justify-center items-center px-4 py-8 md:py-16">
                <div className="w-full max-w-md md:max-w-lg overflow-hidden flex items-center justify-center">
                    <div className="w-full p-6 md:p-8 bg-white rounded-lg shadow-lg border">
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-4 md:mb-6">
                            Professional Login
                        </h1>

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
                                    className="w-full"
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
                                    className="w-full"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-6 gap-2 xs:gap-0">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember" className="text-[#007D63]">Remember me</Label>
                                </div>
                                <Link href={"/forget-password"}>
                                    <Button variant="link" className="text-sm p-0 h-auto text-[#007D63] whitespace-nowrap">
                                        Forgot password?
                                    </Button>
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="bg-[#007D63] w-full mb-2 hover:bg-[#47796f] cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-4 md:mt-6 text-center px-4">
                    <h3 className="text-sm md:text-base font-semibold">Join us as Professional. <span className="text-[#007D63]"><Link href={"/register-professional"}>Create Account</Link></span></h3>
                </div>
            </div>
        </>
    )
}

export default ProfessionalLoginWrapper;