import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./SignUp.module.css";
import { signupUser } from "../../../redux/Slices/authSlice";
import MobileAuthHeader from "../../../MobileComponents/MobileHeader/MobileAuthHeader";
import logo from "/images/logo.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);
  const { isMobile } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !password) {
      setIsError(true);
    } else {
      setIsError(false);
      dispatch(signupUser({ name, email, mobile, password }));
    }
  };

  useEffect(() => {
    if (error) {
      alert(error?.message);
    }
    if (user) {
      navigate("/");
    }
  }, [user, dispatch]);

  return (
    <div className={styles.main_container}>
      {isMobile && <MobileAuthHeader />}
      {!isMobile ? (
        <div className={styles.logo_container}>
          <img src={logo} alt="logo" />
          <h2>Musicart</h2>
        </div>
      ) : (
        <p className={styles.mobile_heading}>Welcome</p>
      )}
      <div className={styles.signup_container}>
        <div className={styles.signup_header}>
          <h2>Create Account</h2>
          {isMobile && <span>Already a customer?</span>}
        </div>
        <div className={styles.input_field}>
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.input_field}>
          <label>Mobile number</label>
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(Number(e.target.value))}
          />
        </div>
        <div className={styles.input_field}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.input_field}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className={styles.disclamar}>
          By enrolling your mobile phone number, you consent to receive
          automated security notifications via text message from Musicart.
          Message and data rates may apply.
        </p>
        {isError && (
          <span className={styles.error}>* All fields are required</span>
        )}
        <button
          disabled={loading}
          style={{ pointerEvents: error ? "none" : "" }}
          onClick={handleSubmit}
          type="submit"
          className={styles.btn}
        >
          {loading ? "signing up..." : "Continue"}
        </button>
        <p className={styles.warning}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div>
      <div>
        Already have an account?<Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}

export default Signup;
