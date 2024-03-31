import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, getCartTotal } from "../../redux/Slices/cartSlice";
import styles from "./Card.module.css";
import cartIcon from "/images/icons8-add-shopping-cart-24.png";

const ProductCard = ({ product }) => {
  /*for(let i=0;i<product.products.length;i++){
    console.log("dta",product.products[i].productName);
  }*/

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userid;

  const handleProduct = () => {
    navigate(`/${product._id}`);
    console.log(product._id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ userId, product  ,quantity: 1 }));
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <div onClick={handleProduct} className={styles.productCard}>
      <div className={styles.product_image_div}>
      {console.log(product?.imageUrl)}
        <img
          loading="lazy"
         
          src={product.imageUrl}
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
        <span>{product?.color}</span>
        <span> | </span>
        <span>{product?.category}</span>
      </div>
    </div>
  );
};

export default ProductCard;
