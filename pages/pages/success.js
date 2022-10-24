import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "../../styles/success.module.css";

import Link from "next/link";
import { clearCart } from "../../redux/slices/cartSlice";
import runOrderAnim from "../../lib/utils";

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    runOrderAnim();
  }, []);

  return (
    <div className={styles.successOuter}>
      <div className="container">
        <div className={styles.success}>
          <p>Thank you for your purchase ❤</p>
          <Link href="/">
            <a className={styles.button}>Explore More</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
