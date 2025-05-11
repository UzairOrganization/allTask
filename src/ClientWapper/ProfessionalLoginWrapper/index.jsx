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
                // dispatch(checkProviderAuthStatus())
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
            <div className="min-h-[80vh] flex flex-col justify-center items-center">
                <div className="mt-12 w-5xl overflow-hidden flex items-center justify-center">
                    <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg border ">
                        <h1 className="text-3xl font-bold text-center text-black mb-6">
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
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember" className={"text-[#007D63]"}>Remember me</Label>
                                </div>
                                <Link href={"/forget-password"}>
                                    <Button variant="link" className="text-sm p-0 h-auto text-[#007D63]">
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
                <div className="mt-3">
                    <h3 className="text-center font-semibold"> Join us as Professional.<span className="text-[#007D63]"> <Link href={"/register-professional"}> Create Account </Link> </span></h3>
                </div>
            </div>
        </>
    )
}

export default ProfessionalLoginWrapper;