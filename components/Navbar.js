import React, { useEffect, useState } from "react";

import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen } from "../redux/slices/cartOpen";

import Cart from "./Cart";
import Profile from "./Profile";

export default function Navbar({ setIsSignInOpen }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isCartOpen = useSelector((state) => state.cartOpen.value);
  const cart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth > 768) setIsNavOpen(true);
    window.addEventListener("resize", () => {
      window.innerWidth > 768 ? setIsNavOpen(true) : setIsNavOpen(false);
    });
  }, []);

  const handleCartClick = () => {
    isCartOpen ? dispatch(setCartOpen(false)) : dispatch(setCartOpen(true));
  };

  const openProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <Link href="/">
          <h2 className={styles.websiteTitle}>ECommerce</h2>
        </Link>
        <nav>
          <ul
            className={`${styles.ul} ${isNavOpen ? null : styles.displayNone}`}
          >
            <li>
              <Link href="/pages/apple">Apple</Link>
            </li>
            <li>
              <Link href="/pages/samsung">Samsung</Link>
            </li>
            <li>
              <Link href="/pages/xiaomi">Xiaomi</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.rightNavOuter}>
          <div className={styles.rightNav}>
            <div className={styles.cartIcon}>
              <button onClick={handleCartClick}>
                <img
                  src="/assets/cart-icon.svg"
                  width="28px"
                  height="28px"
                  alt="Cart"
                />
                <p>{cart.totalProducts}</p>
              </button>
            </div>
            <button className={styles.profileButton} onClick={openProfile}>
              <img
                src="/assets/profile-icon.svg"
                width="30px"
                height="30px"
                alt="Profile"
              />
            </button>
          </div>
          <button
            className={`${styles.menu} ${
              isNavOpen ? styles.crossAnimation : null
            }`}
            onClick={() => setIsNavOpen((prev) => !prev)}
          ></button>
        </div>
      </div>
      {isCartOpen ? <Cart setIsProfileOpen={setIsProfileOpen} /> : null}
      {isProfileOpen ? (
        <Profile
          setIsProfileOpen={setIsProfileOpen}
          setIsSignInOpen={setIsSignInOpen}
        />
      ) : null}
    </div>
  );
}
