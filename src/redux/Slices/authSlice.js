// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  status: "idle",
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/auth/login`,
        credentials
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Async thunk for user signup (optional based on your needs)
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/auth/signup`,
        credentials
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Logged in successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload.data;
        toast.error(`${action.payload.data?.message}`);
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Signed up successfully");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload.data;
        toast.error(`${action.payload.data?.message}`);
      });
  },
});

export const { logoutUser, restoreUserFromToken } = authSlice.actions;

export default authSlice.reducer;
