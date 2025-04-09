import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    success: null
};


export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await API.post("/api/users/login", credentials);
        const data = response.data;

        Cookies.set("token", data.token, { path: "/" });
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    Cookies.remove("token");
    await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", // To ensure cookies are sent
    });

    return null;
});
export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await API.get("/api/users/me", { withCredentials: true });

        return response.data;
    } catch (error) {
        Cookies.remove("token");
        return rejectWithValue("Failed to fetch user details");
    }
});
export const registerEmail = createAsyncThunk("auth/registerEmail", async (email, { dispatch, rejectWithValue }) => {
    try {
        const response = await API.post("/api/users/send-verification", { email });
        return response.data
    } catch (e) {
        return rejectWithValue("Error Sending email.")
    }
})
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, verificationCode, name, password }, { rejectWithValue }) => {
        try {
            const response = await API.post("/api/users/verify-and-register", {
                email,
                verificationCode,
                name,
                password,
            }, { withCredentials: true });

            return response.data.user;

        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.error || "Registration failed"
            );
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            // Handling checkAuthStatus
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = action.payload.isAuthenticated;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // register email
            .addCase(registerEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(registerEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.isAuthenticated = true
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = null;
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;