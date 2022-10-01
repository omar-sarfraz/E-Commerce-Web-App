import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
                <h2 className={styles.websiteTitle}>ECommerce</h2>
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
                            <Image src='/assets/cart-icon.svg' width='28px' height='28px' />
                            <p>2</p>
                        </div>
                        <Image src='/assets/profile-icon.svg' width='28px' height='28px' />
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