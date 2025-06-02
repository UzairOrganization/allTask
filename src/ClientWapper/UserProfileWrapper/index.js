"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { toast, Toaster } from "sonner";
import { VscError } from "react-icons/vsc";
import Header from "@/components/Header/index";
import axios from "axios";
import { API } from "@/lib/data-service";

const UserProfileWrapper = () => {
    const { user } = useSelector((state) => state.auth);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
   
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(
                `${API}/api/users/change-password`,
                { oldPassword, newPassword },
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast.success("Password chasnged!", {
                    description: "Password has been changed successfully.",
                    duration: 3000,
                    position: "bottom-left",
                    style: {
                        color: "#008B6E"
                    }
                });
            }
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            const message = error.response?.data?.error || "Something went wrong!";
            toast.error(message, {
                description: "Try Again.",
                duration: 3000,
                position: "bottom-left",
                style: {
                    color: "red"
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <Header /> */}
            <Toaster />
            <div className="max-w-2xl mx-auto mt-16 p-4">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <Label className="mb-2">Name</Label>
                            <Input value={user?.name || ""} readOnly />
                        </div>
                        <div>
                            <Label className="mb-2">Email</Label>
                            <Input value={user?.email || ""} readOnly />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user?.loginMethod === "password" ? (
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <Label htmlFor="oldPassword" className="mb-2">Old Password</Label>
                                    <Input
                                        type="password"
                                        id="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="newPassword" className="mb-2">New Password</Label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-[#008B6E]" disabled={loading}>
                                    {loading ? "Updating..." : "Update Password"}
                                </Button>
                            </form>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                You signed in using <strong>{user?.loginMethod}</strong>. Password change is not available for this login method.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UserProfileWrapper;
