'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import Header from "@/components/Header";
import API from "@/redux/api"; // You can use axios or fetch inside this
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ForgetPasswordWrapper = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/api/users/forget-password", { email });
            toast.success("Verification code sent!", {
                description: "Check your email",
                duration: 3000,
                position: "bottom-left",
            });
            setStep(2);
        } catch (error) {
            toast.error("Failed to send code", {
                description: error?.response?.data?.message || "Please try again.",
                duration: 3000,
                position: "bottom-left",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/api/users/reset-password", {
                email,
                resetCode,
                newPassword,
            });
            toast.success("Password reset successful!", {
                description: "You can now log in",
                duration: 3000,
                position: "bottom-left",
            });
            router.push("/login");
        } catch (error) {
            toast.error("Reset failed", {
                description: error?.response?.data?.message || "Please try again.",
                duration: 3000,
                position: "bottom-left",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Toaster />
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="m-auto max-w-lg p-8 w-full bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-black mb-6">
                        {step === 1 ? "Reset Your Password" : "Enter Verification Code"}
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
                        <form onSubmit={handleResetPassword}>
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="Enter the code from email"
                                    value={resetCode}
                                    onChange={(e) => setResetCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2 mb-6">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-[#007D63] w-full hover:bg-[#47796f]"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgetPasswordWrapper;
