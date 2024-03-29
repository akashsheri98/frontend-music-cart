import React, { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import { loadStripe } from "@stripe/stripe-js";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCartProducts, getCartTotal } from "../../redux/Slices/cartSlice";
import { Header, Banner } from "../../Components/index";
import MobileAuthHeader from "../../MobileComponents/MobileHeader/MobileAuthHeader";
import MobileFooter from "../../MobileComponents/MobileFooter/MobileFooter";
import backIcon from "/images/icons8-back-50.png";

function Checkout() {
  const { cartItems, totalAmount, totalCount } = useSelector(
    (state) => state.cart
  );
  const { isMobile } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userid;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartTotalAmount = totalAmount + 45;
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchCartProducts(userId));
  }, [dispatch]);

  const makePayementHandler = async () => {
    const stripe = await loadStripe(
      `${import.meta.env.VITE_SERVER_STRIPE_PUBLICABLE_KEY}`
    );
    const body = {
      cartItems,
      totalAmount,
      cartTotalAmount,
    };
    const responce = await fetch(
      `${import.meta.env.VITE_SERVER_HOST}/cart/create-checkout-sesion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const session = await responce.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., sending data to backend
    console.log("Payment Method:", paymentMethod);

    console.log("Additional Info:", additionalInfo);
  };
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div>
        {isMobile ? <MobileAuthHeader /> : <Header />}
        {!isMobile && <Banner pageContent="Checkout" />}
        {isMobile ? (
          <img
            onClick={() => navigate("/cart")}
            className={styles.back_btn_mobile}
            src={backIcon}
            alt="backIcon"
          />
        ) : (
          <button onClick={() => navigate("/cart")} className={styles.back_btn}>
            Back to products
          </button>
        )}
        <h1 className={styles.heading}>Checkout</h1>

        {cartItems && cartItems.length > 0 ? (
          <div className={styles.main_container}>
            <div className={styles.order_details}>
              <div className={styles.delivery_detail}>
                <h2>1. Delivery address</h2>
                <div className={styles.address}>
                  <p>{user.name}</p>
                  <textarea
                    id="additionalInfo"
                    value={additionalInfo}
                    onChange={handleAdditionalInfoChange}
                    placeholder="Any additional information (optional)"
                  />
                </div>
              </div>
              <div className={styles.payment_details}>
                <h2>2. Payment method</h2>
                <div>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Online">Online Payment</option>
                  </select>
                </div>
                <button onClick={handleSubmit}>Place order</button>
              </div>
              <div className={styles.item_review}>
                <h2>3. Review items and delivery</h2>
                <div className={styles.items_container}>
                  
                  {cartItems
                    ?.reduce((uniqueProducts, product) => {
                      const isProductExist = uniqueProducts.some(
                        (item) => item.product[0]._id === product.product[0]._id
                      );
                      if (!isProductExist) {
                        uniqueProducts.push(product);
                      }
                      return uniqueProducts;
                    }, [])
                    .map((product) => (
                      <div
                        key={product?._id}
                        className={styles.cartItems}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className={styles.image_container}>
                          <img
                            src={product?.product[0]?.imageUrl}
                            alt={product?.product[0]?.productName}
                          />
                        </div>
                        {/* {<div className={styles.product_details_container}>
                          <h3>{product?.product[0]?.productName}</h3>
                          <span>Color : {product?.product[0]?.color}</span>
                          <span>In Stock</span>
                          <p>Estimated delivery : </p>
                          <p>Monday — FREE Standard Delivery</p>
                        </div>} */}
                      </div>
                    ))}
                  {selectedProduct && (
                    <div className={styles.product_description}>
                      <h2>{selectedProduct?.product[0]?.productName}</h2>
                      <p>
                        Description: {selectedProduct?.product[0]?.shortDescription}
                      </p>
                      <p>Price: {selectedProduct?.product[0]?.price}</p>
                      {/* Add more details as needed */}
                    </div>
                  )}
                </div>
              </div>
              {isMobile && <hr />}
              <div className={styles.order_confirmation}>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to Place Your Order?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#2fca08",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, Go Ahead!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        makePayementHandler();
                      }
                    });
                  }}
                  className={styles.place_order_btn}
                >
                  Place Your Order
                </button>

                <div>
                  <h2>Order Total : ₹{cartTotalAmount}.00</h2>
                  {!isMobile && (
                    <p>
                      By placing your order, you agree to Musicart privacy
                      notice and conditions of use.
                    </p>
                  )}
                </div>
              </div>
            </div>
            {!isMobile && (
              <div className={styles.order_Price_details}>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to Place Your Order?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#2fca08",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, Go Ahead!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        makePayementHandler();
                      }
                    });
                  }}
                  className={styles.place_order_btn}
                >
                  Place your Order
                </button>

                <p className={styles.terms}>
                  By placing your order, you agree to Musicart privacy notice
                  and conditions of use.
                </p>
                <div className={styles.order_summery}>
                  <p>Order Summery</p>
                  <div className={styles.price}>
                    <p>items: </p>
                    <p>₹ {cartTotalAmount}.00</p>
                  </div>
                  <div className={styles.price}>
                    <p>Delivery: </p>
                    <p>₹ 45</p>
                  </div>
                </div>
                <div className={styles.total_order_amount}>
                  <p>Order Total : </p>
                  <p>₹ {cartTotalAmount + 45}.00</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>cart is empty</div>
        )}
      </div>
      {isMobile && <MobileFooter />}
    </>
  );
}

export default Checkout;
