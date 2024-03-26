import React from "react";
import styles from "./Banner.module.css";

import banne1 from "/images/banner1.jpg";
import banne2 from "/images/banner2.jpg";
import banne3 from "/images/banner3.jpg";
import banne4 from "/images/banner4.png";
import banne5 from "/images/banner5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const images = [banne1, banne2, banne3, banne4, banne5];
  const slideSettings = {
    arrows: false,
    speed: 300,
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
