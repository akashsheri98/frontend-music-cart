import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product ,quantity }, { rejectWithValue }) => {
      try {
      const response = await axios.post(
       
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/cart/addtocart`,
        { userId, product ,quantity }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/cart/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, quantity, productId }, { rejectWithValue }) => {
    try {
      
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/cart/update`,
        { userId, quantity, productId }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_HOST}/cart/${userId}/${productId}`
      );

      return response.data.cart;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/cart/clear/${userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(error.response.data);
    }
  }
);
//export const reloadPage = createAsyncThunk("cart/reloadPage");

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // Initial State


  reducers: {
    getCartTotal: (state ) => {
    
      state.totalAmount = 0;
      state.totalCount = 0; 
      
       if (Array.isArray(state.cartItems)) {
        /*state.cartItems.forEach((item) => {
          state.totalAmount +=
            parseInt(item.product[0].price) * parseInt(item.quantity);
          state.totalCount += parseInt(item.quantity);
        });*/
        
        state.totalAmount = state.cartItems.reduce((total, item) => {
          return total + (parseInt(item.product[0].price) * parseInt(item.quantity));
        }, 0);
      
        state.totalCount = state.cartItems.reduce((totalCount, item) => {
          return totalCount + parseInt(item.quantity);
        }, 0);
       } else {
         console.error("state.cartItems is not an array");

      }
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = [...state.cartItems, action.payload];
        toast.success(` Added to cart`);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`${action.payload.message}`);
      })
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartQuantity.fulfilled, (state  , action) => {
        state.status = "succeeded";
        state.cartItems =action.payload;
        state.totalAmount = 0;
        state.totalCount = 0;
        state.cartItems.forEach((item) => {
          state.totalAmount +=
            parseInt(item.product[0].price) * parseInt(item.quantity);
          state.totalCount += parseInt(item.quantity);
        });
        toast.success(`Quantity updated for this product`);
        
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`Failed to updated the Quantity`);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
        toast.success(`This Item has Removed from cart`);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`Failed to Remove from cart`);
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = [];
        toast.success(`Congratulations! Your Order has been placed`);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      // .addCase(reloadPage.pending,(state) => {
      //   state.status = "loading";
        
      // })
      // .addCase(reloadPage.fulfilled, (state) => {
      //   state.status = "succeeded";
      //   state.cartItems = action.payload;
      //   state.error = null;
      // })
      // .addCase(reloadPage.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
  },
});

export const { getCartTotal } = cartSlice.actions;

export default cartSlice.reducer;
