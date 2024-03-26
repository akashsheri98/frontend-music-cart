// src/redux/singleProductSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch a single product
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_HOST}/products/${productId}`
    );
    return response.data;
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    resetSingleProduct: (state) => {
      state.product = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.product = null;
      });
  },
});

export const { resetSingleProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
