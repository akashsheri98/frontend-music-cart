import { useSelector, useDispatch } from "react-redux";
import styles from "./Invoice.module.css";
import Header from "../Header/Header";
import { fetchCartProducts, getCartTotal } from "../../redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MobileAuthHeader from "../../MobileComponents/MobileHeader/MobileAuthHeader";
import MobileFooter from "../../MobileComponents/MobileFooter/MobileFooter";
import Banner from "../Banner/Banner";
const InvoiceCard = () => {
  const { cartItems, totalAmount, totalCount } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const { isMobile } = useSelector((state) => state.ui);

  const userId = user?.userid;

  console.log("user", user);
  console.log("userId", userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartTotalAmount = totalAmount + 45;

  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/order/getInvoice`,
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, [userId]);
  return (
    <>
      <Header />
      {isMobile ? <MobileAuthHeader /> : <Header />}
        {!isMobile && <Banner pageContent="invoice" />}
        {isMobile ? (
          <img
            onClick={() => navigate("/")}
            className={styles.back_btn_mobile}
            src={backIcon}
            alt="backIcon"
          />
        ) : (
          <button onClick={() => navigate("/")} className={styles.back_btn}>
            Back to products
          </button>
        )}
      {invoices && invoices.length > 0 ? (
        invoices.map((invoice) => (
          <div key={invoice._id} className={styles.flex_container}>
            <div className={styles.card}>
              <div className={styles.card__header}>
                <h3 className={styles.card__title}>Invoice</h3>
                <h4 className={styles.card__subTitle}>
                  <p>{user?.name}</p>
                  Invoice ID: {invoice._id}
                  
                </h4>
              </div>
              <div className={styles.card__body}>
                <p className={styles.card__text}>
                  Invoice Date: {invoice.createdAt.slice(0, 10)}
                </p>
                <p className={styles.card__text}>
                  Total Amount: {invoice.totalAmount}
                </p>{" "}
                {/* Assuming invoice has totalAmount property */}
                
                { <p className={styles.card__text}>
                  Total Items: {invoice.products.reduce((total, product) => total + product.quantity, 0)}
                </p> }
                {/* Assuming invoice has cartItems property */}
                <p className={styles.card__text}>
                  Payment Mode: {invoice.paymentMethod}
                </p>
              </div>
              
            </div>
          </div>

        ))
      ) : (
        <div className={styles.flex_container}>
          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3 className={styles.card__title}>Invoice</h3>
              <h4 className={styles.card__subTitle}>Invoice ID: 123456789</h4>
            </div>
            <div className={styles.card__body}>
              <p className={styles.card__text}>Invoice Date: 2022-01-01</p>
              <p className={styles.card__text}>
                Total Amount: {cartTotalAmount}
              </p>
              <p className={styles.card__text}>Total Items: {totalCount}</p>
            </div>
          </div>
        </div>
      )}
      {/* <div className={styles.flex_container}>
        <div className={styles.card}>
        <div className={styles.card__header}>
            <h3 className={styles.card__title}>Invoice</h3>
            <h4 className={styles.card__subTitle}>Invoice ID: 123456789</h4>
        </div>
        <div className={styles.card__body}>
            <p className={styles.card__text}>Invoice Date: 2022-01-01</p>
        
        </div>
        
        </div>
    </div> */}
    </>
  );
};

export default InvoiceCard;
