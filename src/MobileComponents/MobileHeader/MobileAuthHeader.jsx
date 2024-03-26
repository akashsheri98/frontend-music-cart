import React from "react";
import styles from "./MobileHeader.module.css";
import logo from "/images/musicartLogo.png";

const MobileAuthHeader = () => {
  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.logo_div}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default MobileAuthHeader;
