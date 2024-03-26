import React from "react";
import styles from "./MobileHeader.module.css";
import logo from "/images/musicartLogo.png";
import { useSelector } from "react-redux";
import usersIcon from "/images/icons8-group-32.png";

const MobileHeader = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.header_div}>
          <img className={styles.logo_img} src={logo} alt="logo" />
          <div className={styles.user_info}>
            <img src={usersIcon} alt="user" />
            <h3>{user?.name.toUpperCase()}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
