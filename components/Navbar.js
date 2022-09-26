import React from 'react';
import Image from 'next/image';

import styles from '../styles/navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={styles.main}>
            <div className={styles.navbar}>
                <h2>ECommerce</h2>
                <nav>
                    <ul className={styles.ul}>
                        <li><Link href='#'>Apple</Link></li>
                        <li><Link href='#'>Samsung</Link></li>
                        <li><Link href='#'>Xiaomi</Link></li>
                    </ul>
                </nav>
                <div className={styles.rightNav}>
                    <Image src='/assets/cart-icon.svg' width='33px' height='33px' />
                    <Image src='/assets/profile-icon.svg' width='33px' height='33px' />
                    <p className={styles.menu}></p>
                </div>
            </div>
            <nav>
                <ul className={styles.mobileNav}>
                    <li><Link href='#'>Apple</Link></li>
                    <li><Link href='#'>Samsung</Link></li>
                    <li><Link href='#'>Xiaomi</Link></li>
                </ul>
            </nav>
        </div>
    );
}