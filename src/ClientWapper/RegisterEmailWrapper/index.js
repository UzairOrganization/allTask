'use client';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerEmail, registerUser } from "@/redux/slices/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import Header from "@/components/Header";
import API from "@/redux/api"; // Direct API call for verifyCodeAndRegister
import { useRouter } from "next/navigation";

const RegisterWrapper = () => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerEmail(email));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Verification code sent!", {
                description: "Check your email",
                duration: 3000,
                position: "bottom-left",
            });
            setStep(2); // Move to next step
        } else {
            toast.error("Failed to send code", {
                description: "Please try again.",
                duration: 3000,
                position: "bottom-left",
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(registerUser({ email, verificationCode, name, password }));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Registration successful!", {
                    description: "You can now log in",
                    duration: 3000,
                    position: "bottom-left",
                });
                router.push("/")
            }
            // Redirect to login or dashboard here
        } catch (error) {
            toast.error("Verification failed", {
                description: error?.response?.data?.error || "Please try again.",
                duration: 3000,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
            <Header />
            <Toaster />
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="m-auto max-w-lg p-8 w-full bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-black mb-6">
                        {step === 1 ? "Verify Your Email" : "Complete Registration"}
                    </h1>

                    {step === 1 ? (
                        <form onSubmit={handleEmailSubmit}>
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-[#007D63] w-full hover:bg-[#47796f]"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Verification Code"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="Enter the code from email"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2 mb-6">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-[#007D63] w-full hover:bg-[#47796f]"
                            >
                                Register
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default RegisterWrapper;
