import React, { useEffect, useState } from 'react';

import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Cart from './Cart'

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cart = useSelector((state) => state.cart.value)

    useEffect(() => {
        if (window.innerWidth > 768) setIsNavOpen(true);
        window.addEventListener('resize', () => {
            window.innerWidth > 768 ? setIsNavOpen(true) : setIsNavOpen(false)
        })
    }, []);


    return (
        <div className={styles.main}>
            <div className={styles.navbar}>
                <Link href='/'><h2 className={styles.websiteTitle}>ECommerce</h2></Link>
                <nav>
                    <ul className={`${styles.ul} ${isNavOpen ? null : styles.displayNone}`}>
                        <li><Link href='/pages/apple'>Apple</Link></li>
                        <li><Link href='/pages/samsung'>Samsung</Link></li>
                        <li><Link href='/pages/xiaomi'>Xiaomi</Link></li>
                    </ul>
                </nav>
                <div className={styles.rightNavOuter}>
                    <div className={`${styles.rightNav}`}>
                        <div className={styles.cartIcon}>
                            <button onClick={() => setIsCartOpen(prev => !prev)}>
                                <img src='/assets/cart-icon.svg' width='28px' height='28px' alt="Cart" />
                                <p>{cart.totalProducts}</p>
                            </button>
                        </div>
                        <Link href='#'>
                            <img className={styles.profile} src='/assets/profile-icon.svg' width='28px' height='28px' alt="Profile" />
                        </Link>
                    </div>
                    <button
                        className={`${styles.menu} ${isNavOpen ? styles.crossAnimation : null}`}
                        onClick={() => setIsNavOpen(prev => !prev)}
                    ></button>
                </div>
            </div>
            {isCartOpen ? <Cart products={cart.products} /> : null}
        </div>
    );
}