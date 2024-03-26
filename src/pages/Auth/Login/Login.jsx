import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../redux/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import logo from "/images/logo.png";
import MobileAuthHeader from "../../../MobileComponents/MobileHeader/MobileAuthHeader";

function Login() {
  const { user, loading } = useSelector((state) => state.auth);
  const { isMobile } = useSelector((state) => state.ui);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setIsError(true);
    } else {
      setIsError(false);
      dispatch(loginUser({ email, password }));
    }
  };

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
      <div className={styles.login_container}>
        <div className={styles.login_header}>
          <h2>Sign In</h2>
          {isMobile && <span>Already a customer?</span>}
        </div>
        <div className={styles.input_field}>
          <label>Enter your email or mobile number</label>
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
        {isError && (
          <span className={styles.error}>* All fields are required</span>
        )}
        <button
          style={{ pointerEvents: loading ? "none" : "" }}
          onClick={handleSubmit}
          type="submit"
          className={styles.btn}
        >
          {loading ? "signing in..." : "Continue"}
        </button>
        <p className={styles.warning}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div>
      <div className={styles.text}>
        <span className={styles.line}>
          <hr />
        </span>
        <span>New to Musicart?</span>
        <span className={styles.line}>
          <hr />
        </span>
      </div>
      <Link to="/signup">
        <div className={styles.createAccount_Btn}>
          <p>Create your Musicart account</p>
        </div>
      </Link>
    </div>
  );
}

export default Login;
