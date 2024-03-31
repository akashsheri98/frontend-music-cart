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
import FeedbackForm from "../../Components/FeedBack/FeedbackForm";

const Home = () => {
  const [isListView, setIsListView] = useState(false);
  const { isMobile } = useSelector((state) => state.ui);

  const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
        setShowModal(!showModal);
    };

    // const closeModal = () => {
    //     setShowModal(false);
    // };



  return (
    <div className={styles.container}>
      {isMobile ? <MobileHeader /> : <Header />}
      {!isMobile && <Banner pageContent="" />}
      <BannerSlider />
      <Features isListView={isListView} setIsListView={setIsListView} />
      <AllProducts isListView={isListView} />
      {isMobile && <MobileFooter />}
      
        <div className={styles.feedback}>
            <img  src="src/pages/home/feedback.jpg" alt="Feedback" className={styles.feedbackImage} onClick={handleImageClick} />
            {showModal && <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {/* <span className={styles.close} onClick={closeModal}>&times;</span> */}
                    <FeedbackForm />
                </div>
            </div>}
        </div>

    </div>
  );
};

export default Home;

