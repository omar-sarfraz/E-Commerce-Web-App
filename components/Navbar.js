import React, { useEffect, useState } from 'react';

import styles from '../styles/navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false)

    useEffect(() => {
        if (window.innerWidth > 768)
            setIsNavOpen(true)
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.navbar}>
                <Link href='#'><h2 className={styles.websiteTitle}>ECommerce</h2></Link>
                <nav>
                    <ul className={`${styles.ul} ${isNavOpen ? null : styles.displayNone}`}>
                        <li><Link href='#'>Apple</Link></li>
                        <li><Link href='#'>Samsung</Link></li>
                        <li><Link href='#'>Xiaomi</Link></li>
                    </ul>
                </nav>
                <div className={styles.rightNavOuter}>
                    <div className={`${styles.rightNav}`}>
                        <div className={styles.cartIcon}>
                            <Link href='#'>
                                <img src='/assets/cart-icon.svg' width='28px' height='28px' alt="Cart" />
                            </Link>
                            <p>2</p>
                        </div>
                        <Link href='#'>
                            <img src='/assets/profile-icon.svg' width='28px' height='28px' alt="Profile" />
                        </Link>
                    </div>
                    <button
                        className={`${styles.menu} ${isNavOpen ? styles.crossAnimation : null}`}
                        onClick={() => setIsNavOpen(prev => !prev)}
                    ></button>
                </div>
            </div>
        </div>
    );
}