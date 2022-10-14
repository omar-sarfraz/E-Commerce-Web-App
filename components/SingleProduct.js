import React from 'react';

import styles from '../styles/singleProduct.module.css';
import Link from 'next/link';

import { urlFor } from '../lib/client';

export default function SingleProduct({ product }) {
    return (
        <div className={styles.productContainer}>
            <img className={styles.image} src={urlFor(product.image[0])} alt={`${product.name} Image`} />
            <div className={styles.text}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.description}>{product.details}</p>
                <Link href='#'>
                    <a className={styles.button}>Buy Now</a>
                </Link>
            </div>
        </div>
    );
}