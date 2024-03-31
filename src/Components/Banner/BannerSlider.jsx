import React from "react";
import styles from "./Banner.module.css";

import banner1 from "/images/banner1.jpg";
import banner2 from "/images/banner2.jpg";
import banner3 from "/images/banner3.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const images = [banner1, banner2 ,banner3];
  const slideSettings = {
    arrows: false,
    speed: 150,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerPadding: "0px",
  };
  return (
    <div className={styles.banner_Image_container}>
      <Slider {...slideSettings}>
        {images.map((image, index) => (
          <div className={styles.product_img} key={index}>
            <img src={image} alt="banner" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
