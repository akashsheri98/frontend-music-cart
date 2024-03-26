import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/Slices/cartSlice";
import styles from "./ListProduct.module.css";
import cartIcon from "/images/icons8-add-shopping-cart-24.png";

const ListProduct = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userid;

  const handleAddToCart = () => {
    dispatch(addToCart({ userId, product, quantity: 1 }));
  };
  return (
    <div className={styles.productList_container}>
      <div className={styles.product_image_div}>
        <img
          loading="lazy"
          src={product?.imageUrl}
          alt={product?.productName}
          className={styles.productImage}
        />
        {user && (
          <img
            onClick={handleAddToCart}
            className={styles.cartIcon}
            src={cartIcon}
            alt="cartIcon"
          />
        )}
      </div>
      <div className={styles.product_desc}>
        <h2 className={styles.productTitle}>{product?.productName}</h2>
        <p className={styles.productPrice}> Price : ₹ {product?.price}</p>
        <p className={styles.product_details}>{product?.description}</p>
        <span>{product?.color}</span>
        <span> | </span>
        <span>{product?.category}</span>

        <button
          onClick={() => navigate(`/${product._id}`)}
          className={styles.detail_btn}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
