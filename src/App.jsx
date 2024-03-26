import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "./redux/Slices/UiSlice";
import { ToastContainer, Zoom } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/OrderSucces/Success";
import AddProduct from "./pages/AddProduct/AddProduct";

import { Footer, ProductDetails } from "./Components/index";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.ui);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 520));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={3000}
      />
     
      <Routes>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<Success />} />
      </Routes>
      {!isMobile && <Footer />}
    </Router>
  );
};

export default App;
