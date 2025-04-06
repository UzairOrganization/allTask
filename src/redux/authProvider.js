"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./slices/authSlice";

export default function AuthProvider({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    return <>{children}</>;
}
