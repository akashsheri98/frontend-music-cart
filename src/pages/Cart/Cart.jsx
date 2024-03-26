import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import Swal from "sweetalert2";

import {
  fetchCartProducts,
  getCartTotal,
  removeFromCart,
  updateCartQuantity,
} from "../../redux/Slices/cartSlice";
import { Header, Banner } from "../../Components/index";
import MobileFooter from "../../MobileComponents/MobileFooter/MobileFooter";
import SeachBarHeader from "../../MobileComponents/MobileHeader/MobileHeader";
import backIcon from "/images/icons8-back-50.png";
import bagIcon from "/images/icons8-bag-64.png";
import deleteIcon from "/images/icons8-delete-30.png";

const Cart = () => {
  const { cartItems, totalAmount, totalCount } = useSelector(
    (state) => state.cart
  );

  const { isMobile } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userid;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = ({ e, productId }) => {
    dispatch(getCartTotal());
    let quantity = parseInt(e.target.value);
    dispatch(updateCartQuantity({ quantity, productId, userId }));
  };

  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure you want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2fca08",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getCartTotal());
        dispatch(removeFromCart({ productId, userId }));
      }
    });
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchCartProducts(userId));
  }, [dispatch]);

  return (
    <>
      <div>
        {isMobile ? <SeachBarHeader /> : <Header />}
        {!isMobile && <Banner pageContent="ViewCart" />}
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
        {!isMobile && (
          <div className={styles.cart_heading}>
            <img src={bagIcon} alt="bagIcon" />
            <h1>My Cart</h1>
          </div>
        )}
        {cartItems && cartItems.length > 0 ? (
          <div className={styles.main_container}>
            <div className={styles.cart_container}>
              {cartItems?.map((item, i) => (
                <div key={i} className={styles.cart_item_container}>
                  <div className={styles.image_container}>
                    <img
                      src={item.images ? item?.images[0] : ""}
                      alt={item?.title}
                    />
                  </div>
                  <div className={styles.product_details_container}>
                    <div className={styles.title}>
                      <h3>{item?.title}</h3>
                      {isMobile && <h3> ₹ {item?.price}</h3>}
                      <p>Color : Black</p>
                      <p>In Stock</p>
                    </div>

                    {!isMobile && (
                      <div className={styles.price}>
                        <h3>Price</h3>
                        <p> ₹ {item?.price}</p>
                      </div>
                    )}
                    <div>
                      <h3>Quantity</h3>
                      <select
                        className={styles.select_quantity}
                        value={item?.quantity}
                        onChange={(e) =>
                          handleQuantityChange({
                            e,
                            productId: item._id,
                          })
                        }
                      >
                        {[...Array(8)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.product_total_price}>
                      <h3>Total :</h3>
                      <p> ₹ {item?.price * item?.quantity}</p>
                    </div>
                  </div>
                  <img
                    className={styles.delete_icon}
                    onClick={() => handleRemoveFromCart(item?._id)}
                    src={deleteIcon}
                    alt="deleteIcon"
                  />
                </div>
              ))}
              {isMobile && <hr />}
              <div className={styles.total_products}>
                <p>{totalCount} Item</p>
                <p> ₹ {totalAmount}</p>
              </div>
              {isMobile && (
                <Link to="/checkout">
                  <button className={styles.place_order_btn}>
                    Contitue to checkout
                  </button>
                </Link>
              )}
            </div>
            {!isMobile && (
              <div className={styles.cart_price_details}>
                <h4>Price Details</h4>
                <div className={styles.price_details}>
                  <div className={styles.about_price}>
                    <p>Total MRP</p>
                    <p> ₹ {totalAmount}</p>
                  </div>
                  <div className={styles.about_price}>
                    <p>Discount on MRP MRP</p>
                    <p> ₹ 0</p>
                  </div>
                  <div className={styles.about_price}>
                    <p>Convenience Fee</p>
                    <p> ₹ 45</p>
                  </div>
                  <div className={styles.cart_grand_total}>
                    <h2>Total Amount -</h2>
                    <p>₹ {totalAmount + 45}</p>
                  </div>
                  <Link to="/checkout">
                    <button className={styles.place_order_btn}>
                      Contitue to checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.cart_empty_container}>Your cart is empty</div>
        )}
      </div>
      {isMobile && <MobileFooter />}
    </>
  );
};

export default Cart;
