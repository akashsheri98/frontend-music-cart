import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Success.module.css";
import success from "/images/confetti 1.png";
import { clearCart } from "../../redux/Slices/cartSlice";
import MobileAuthHeader from "../../MobileComponents/MobileHeader/MobileAuthHeader";
import MobileFooter from "../../MobileComponents/MobileFooter/MobileFooter";
import logo from "/images/logo.png";

const Success = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userid;
  const { isMobile } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart(userId));
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [dispatch]);
  return (
    <div className={styles.main_container}>
      {isMobile ? (
        <MobileAuthHeader />
      ) : (
        <div className={styles.logo_container}>
          <img src={logo} alt="logo" />
          <h2>Musicart</h2>
        </div>
      )}
      <div className={styles.success_container}>
        <img src={success} alt="SuccessLogo" />
        <h2>Order is placed successfully!</h2>
        <p>You will be receiving a confirmation email with order details</p>

        <button className={styles.back_btn}>
          Thanks for Shopping with Us !!
        </button>

        {isMobile && <MobileFooter />}
      </div>
    </div>
  );
};

export default Success;
