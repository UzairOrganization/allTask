import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
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
    Cookies.remove("token"); // Remove token from cookies
    return null;
});
export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await API.get("/api/users/me");
        dispatch(setUser(response.data));
        return response.data;
    } catch (error) {
        Cookies.remove("token");
        return rejectWithValue("Failed to fetch user details");
    }
});


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
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;