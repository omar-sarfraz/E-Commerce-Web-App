import React from 'react';
import Image from 'next/image';

import styles from '../styles/navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Image src='/assets/logo.png' width='220px' height='50px'></Image>
        </div>
    );
}