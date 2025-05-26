import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "@/lib/data-service";
const initialState = {
    providers: [],
    hierarchy: null,
    loading: false,
    error: null,
};

export const getAvailableProviders = createAsyncThunk(
    'providers/getAvailableProviders',
    async ({ postalCode, category }, thunkAPI) => {
        try {
            const response = await axios.get(`${API}/api/service-provider/get-available-provider-by-postal-code`, {
                params: { postalCode, category },
            });
            
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || 'Something went wrong');
        }
    }
);
export const findCategoryHierarchy = createAsyncThunk(
    'category/findCategoryHierarchy',
    async (subSubcategory, thunkAPI) => {
        try {
            const response = await axios.post(`${API}/api/category/find-hierarchy`, { subSubcategory });
            return response.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch hierarchy');
        }
    }
);

const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        resetProviderState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // GET Providers
            .addCase(getAvailableProviders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAvailableProviders.fulfilled, (state, action) => {
                state.loading = false;
                state.providers = action.payload.filteredProviders;
            })
            .addCase(getAvailableProviders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FIND Hierarchy
            .addCase(findCategoryHierarchy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findCategoryHierarchy.fulfilled, (state, action) => {
                state.loading = false;
                state.hierarchy = action.payload;
            })
            .addCase(findCategoryHierarchy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetProviderState } = providerSlice.actions;
export default providerSlice.reducer;