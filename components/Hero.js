import React, { useState } from 'react';
import Image from 'next/image';

import styles from '../styles/hero.module.css';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className={styles.heroMain}>
            <div className='container'>
                <div className={styles.heroInner}>
                    <div className={styles.heroImage}>
                        <Image src='/assets/Banner-pic.png' objectFit='contain' layout='fill' />
                    </div>
                    <div className={styles.text}>
                        <p className={styles.subHeading}>Apple Beast Headphones</p>
                        <p className={styles.heading}>Premium Sound Quality</p>
                        <p className={styles.description}>Take your sound experience to next level with the all new apple beast headphones</p>
                        <p className={styles.buyHeading}>Now Available at 299$</p>
                        <div className={styles.linkWrapper}><Link href='#'><a className={styles.buyButton}>Buy Now</a></Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}