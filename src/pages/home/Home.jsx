import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";

import {
  Banner,
  Features,
  AllProducts,
  BannerSlider,
  Header,
} from "../../Components/index";

import MobileHeader from "../../MobileComponents/MobileHeader/MobileHeader";
import MobileFooter from "../../MobileComponents/MobileFooter/MobileFooter";

const Home = () => {
  const [isListView, setIsListView] = useState(false);
  const { isMobile } = useSelector((state) => state.ui);
  return (
    <div className={styles.container}>
      {isMobile ? <MobileHeader /> : <Header />}
      {!isMobile && <Banner pageContent="" />}
      <BannerSlider />
      <Features isListView={isListView} setIsListView={setIsListView} />
      <AllProducts isListView={isListView} />
      {isMobile && <MobileFooter />}
    </div>
  );
};

export default Home;
