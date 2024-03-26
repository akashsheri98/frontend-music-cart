import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching products from an API endpoint
/*export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/product/create`
    );
    return response.data;
  }
);*/

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/product/getAll`
    );
    return response.data;
  }
);
// Async thunk for filtering
export const filterProducts = createAsyncThunk(
  "filter/filterProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/product/filter`,
        { params: filters["0"] }
      );
       
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(filterProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default productsSlice.reducer;
