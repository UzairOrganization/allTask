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


const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    useEffect(() => {
        const checkAuth = async () => {
            const result = await dispatch(checkAuthStatus());
            if (result.meta.requestStatus === "fulfilled" && isAuthenticated) {
                router.push("/");
            }
        };

        checkAuth();
    }, [dispatch, isAuthenticated, router]);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(credentials));

        if (result.meta.requestStatus === "fulfilled") {
            redirect("/");
            window.location.reload();
        }
    };

    return (
        <>
            <Head>
                <title>Login - Alltasko</title>
                <meta name="description" content="Login to your account on Alltasko." />
            </Head>
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-md border">
                    <h1 className="text-3xl font-bold text-center text-black mb-6">
                        Welcome back
                    </h1>

                    {error && <p className="text-red-500 text-center">{error}</p>}

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
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Button variant="link" className="text-sm p-0 h-auto">
                                Forgot password?
                            </Button>
                        </div>

                        {/* Login Button */}
                        <Button type="submit" className="w-full mb-6" disabled={loading}>
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
                        <Button variant="outline" className="w-full gap-2">
                            <FaFacebook className="w-6 h-6" />
                            Continue with Facebook
                        </Button>
                        <Button variant="outline" className="w-full gap-2">
                            <AiFillGoogleCircle className="w-6 h-6" />
                            Continue with Google
                        </Button>
                    </div>

                    {/* Terms Notice */}
                    <p className="mt-6 text-xs text-gray-500 text-center">
                        By clicking Continue with Facebook, Google, or Apple, you agree to the
                        <a href="#" className="underline"> Terms of Use</a> and
                        <a href="#" className="underline"> Privacy Policy</a>.
                        We'll keep you logged in.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
