import React from 'react';
import Image from 'next/image';

import styles from '../styles/hero.module.css';
import Link from 'next/link';
import { urlFor } from '../lib/client';

export default function Hero({ bannerData }) {
    return (
        <div className={styles.heroMain}>
            <div className='container'>
                <div className={styles.heroInner}>
                    <div className={styles.heroImage}>
                        <Image src={urlFor(bannerData.image)} objectFit='contain' layout='fill' alt={`${bannerData.productName} Image`} />
                    </div>
                    <div className={styles.text}>
                        <p className={styles.subHeading}>{bannerData.productName}</p>
                        <p className={styles.heading}>{bannerData.bigTitle}</p>
                        <p className={styles.description}>{bannerData.description}</p>
                        <p className={styles.buyHeading}>{bannerData.priceTitle}</p>
                        <div className={styles.linkWrapper}><Link href='#'><a className={styles.buyButton}>{bannerData.buttonText}</a></Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}