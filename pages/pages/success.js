import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/success.module.css";

import Link from "next/link";
import { clearCart } from "../../redux/slices/cartSlice";
import runOrderAnim from "../../lib/utils";
import emailjs from "@emailjs/browser";

export default function Success() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    dispatch(clearCart());
    runOrderAnim();
    handleEmail();
  }, []);

  const handleEmail = () => {
    const params = {
      customer_name: user.firstName + " " + user.lastName,
      address: user.address,
    };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        params,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID
      )
      .then((res) => {
        console.log("Email sent!", res.status, res.text);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.successOuter}>
      <div className="container">
        <div className={styles.success}>
          <p>Thank you for your purchase ❤</p>
          <p>
            Your Order will be shipped to <span>{user.address}</span>
          </p>
          <Link href="/">
            <a className={styles.button}>Explore More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
