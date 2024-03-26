import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/Slices/cartSlice";
import {
  fetchSingleProduct,
  resetSingleProduct,
} from "../../redux/Slices/singleProductSlice";

import styles from "./ProductDetails.module.css";
import { Header, Banner } from "../index";
import SearchBarHeader from "../../MobileComponents/MobileHeader/MobileHeader";
import MobileFooter from "../../MobileComponents/MobileFooter/MobileFooter";

import backIcon from "/images/icons8-back-50.png";
import DetailPageSkeletan from "../LodingSkeletan/ProductDetailSkeletan/DetailPageSkeletan";

function ProductDetails() {
  const { isMobile } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userid;
  const { product, status, error } = useSelector(
    (state) => state.singleProduct
  );
  const [displayImageIndex, setDisplayImageIndex] = useState(0);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slideSettings = {
    arrows: false,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerPadding: "0px",
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    return () => {
      dispatch(resetSingleProduct());
    };
  }, [dispatch, productId]);

  if (status === "loading") return <DetailPageSkeletan />;
  if (status === "failed")
    return (
      <div>
        <h3>NetWork Error ! Please Refresh the page</h3>
      </div>
    );

  const handleAddToCart = async () => {
    if (user) {
      await dispatch(addToCart({ userId, product }));
      navigate("/cart");
    } else {
      Swal.fire({
        icon: "error",
        title: "You are not logged in!",
        text: "Please login first!",
      });
      navigate("/login");
    }
  };

  return (
    <>
      {isMobile ? <SearchBarHeader /> : <Header />}
      {!isMobile && <Banner pageContent={product?.title} />}
      <div div className={styles.container}>
        {isMobile ? (
          <img
            onClick={() => navigate(-1)}
            className={styles.back_btn_mobile}
            src={backIcon}
            alt="backIcon"
          />
        ) : (
          <button onClick={() => navigate(-1)} className={styles.back_btn}>
            Back to products
          </button>
        )}
        {product ? (
          <>
            <div className={styles.product_container}>
              {!isMobile && (
                <p className={styles.about_product}>
                  {product.title} is {product.description}
                </p>
              )}
              <div className={styles.product_details}>
                {isMobile && (
                  <button onClick={handleAddToCart} className={styles.buy_btn}>
                    Buy Now
                  </button>
                )}
                {isMobile && (
                  <Slider {...slideSettings}>
                    {product.images.map((image, index) => (
                      <div className={styles.product_img} key={index}>
                        <img src={image} alt={product.title} />
                      </div>
                    ))}
                  </Slider>
                )}
                {!isMobile && (
                  <div className={styles.product_img}>
                    <img
                      src={product.images[displayImageIndex]}
                      alt={product.title}
                    />
                  </div>
                )}
                <div className={styles.product_desc}>
                  <h2 className={styles.productTitle}>{product.title}</h2>
                  <div className={styles.reviews}>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>50 Customer reviews</span>
                  </div>
                  {isMobile && (
                    <p className={styles.about_product}>
                      {product.title} is {product.description}
                    </p>
                  )}
                  <h2 className={styles.productPrice}>
                    Price - ₹ {product.price}
                  </h2>
                  <div>
                    <span>{product?.color}</span>
                    <span> | </span>
                    <span>{product?.type} </span>
                  </div>
                  <p className={styles.product_info}>About this Item</p>
                  <ul>
                    {product?.details?.map((info, index) => (
                      <li key={index} className={styles.product_info_list}>
                        * {info}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.product_available}>
                    <h3>Available - </h3> <span> In Stock</span>
                  </div>
                  <div className={styles.product_available}>
                    <h3>Brand - </h3> <span> {product.brand}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.product_footer}>
              {!isMobile && (
                <div className={styles.product_other_images}>
                  {product?.images?.map((image, index) => (
                    <div key={index} className={styles.other_images_container}>
                      <img
                        key={index}
                        onMouseEnter={() => setDisplayImageIndex(index)}
                        src={image}
                        alt={product.title}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.product_btns}>
                <button onClick={handleAddToCart} className={styles.cart_btn}>
                  Add to Cart
                </button>

                <button onClick={handleAddToCart} className={styles.buy_btn}>
                  Buy Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <DetailPageSkeletan />
        )}
      </div>
      {isMobile && <MobileFooter />}
    </>
  );
}

export default ProductDetails;
