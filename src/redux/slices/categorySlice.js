import { API } from '@/lib/data-service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ⏳ Thunk to fetch hierarchy by subSubcategory
export const fetchHierarchy = createAsyncThunk(
  'category/fetchHierarchy',
  async (subSubcategory, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/api/category/find-hierarchy`, {
        subSubcategory,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Something went wrong' });
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: null,
    subcategory: null,
    subSubcategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearHierarchy: (state) => {
      state.category = null;
      state.subcategory = null;
      state.subSubcategory = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHierarchy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHierarchy.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
        state.subcategory = action.payload.subcategory;
        state.subSubcategory = action.payload.subSubcategory;
      })
      .addCase(fetchHierarchy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch hierarchy';
      });
  },
});

export const { clearHierarchy } = categorySlice.actions;

export default categorySlice.reducer;