import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

import cartIcon from "/images/icons8-cart-24.png";
import { fetchCartProducts } from "../../redux/Slices/cartSlice";
import logo from "/images/logo.png";

const Banner = ({ pageContent }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const userId = user?.userid;

  const checkIsCartPageOrIsCheckoutPage = () => {
    if (pageContent === "ViewCart") {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (user && userId) {
      dispatch(fetchCartProducts(userId));
    }
  }, [dispatch, user]);

  return (
    <div className={styles.main_container}>
      <div className={styles.headSection}>
        <div className={styles.logo_container}>
          <img src={logo} alt="logo" />
          <h2>Musicart</h2>
          <p>
            <Link to="/">Home</Link> / {pageContent}
          </p>
        </div>
        <div>
          {user && checkIsCartPageOrIsCheckoutPage() && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "10px",
                }}
              >
                {/* <p className={styles.cart_count}>{cartItems.length}</p> */}
                <Link to="/invoice-card">
                  <button
                    style={{
                      textDecoration: "none",
                      color: "blaclk",
                      fontWeight: "bold",
                      border: "none",
                      fontSize: "18px",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      background: "none",
                      paddingTop: "10px",
                    }}
                  >
                    invoice
                  </button>
                </Link>
                <Link to="/cart">
                  <button
                    className={styles.viewCart_btn}
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <img src={cartIcon} alt="cartIcon" />
                    View Cart {cartItems.length}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
