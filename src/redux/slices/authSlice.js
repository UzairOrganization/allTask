import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import Cookies from "js-cookie";
import axios from "axios";
import { API as APIURL } from "@/lib/data-service";
const initialState = {
    user: null,
    provider: null,
    loading: false,
    isAuthenticated: false,
    isProfessionalAuhtenticated: false,
    error: null,
    success: null
};


export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${APIURL}/api/users/login`, credentials, { withCredentials: true });
        const data = response.data;

        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});
export const professionalLogout = createAsyncThunk("professional/logout", async () => {
    Cookies.remove("token");
})
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
   
    await fetch(`${APIURL}/auth/logout`, {
        method: "GET",
        credentials: "include", // To ensure cookies are sent
    });

    return null;
});
export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.get(`${APIURL}/api/users/me`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch user details");
    }
});
export const checkProviderAuthStatus = createAsyncThunk("auth/checkProviderAuthStatus", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.get(`${APIURL}/api/service-provider/service-provider-details`, { withCredentials: true })

        return response.data
    } catch (error) {
        return rejectWithValue("Failed to fetch user details");
    }
})
export const registerEmail = createAsyncThunk("auth/registerEmail", async (email, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(`${APIURL}/api/users/send-verification`, { email });
        return response.data
    } catch (e) {
        return rejectWithValue("Error Sending email.")
    }
})
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, verificationCode, name, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${APIURL}/api/users/verify-and-register`, {
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
                state.isProfessionalAuhtenticated = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.isProfessionalAuhtenticated = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isProfessionalAuhtenticated = false
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
                state.isProfessionalAuhtenticated = false
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.isProfessionalAuhtenticated = false
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
                state.isAuthenticated = true;
                state.isProfessionalAuhtenticated = false
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = null;
                state.isAuthenticated = false;
                state.isProfessionalAuhtenticated = false
            })
            .addCase(checkProviderAuthStatus.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkProviderAuthStatus.fulfilled, (state, action) => {
                state.isAuthenticated = false
                state.user = null;
                state.provider = action.payload.provider
                state.isProfessionalAuhtenticated = action.payload.isProfessional
            })
            .addCase(checkProviderAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.isProfessionalAuhtenticated = false
                state.provider = null
                state.error = action.payload;
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;