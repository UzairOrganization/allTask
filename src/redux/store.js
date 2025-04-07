import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import providerReducer from "./slices/serviceProvider"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        provider: providerReducer
    }
})