import React from 'react';

import styles from '../styles/singleProduct.module.css';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';

export default function SingleProduct({ product }) {
    return (
        <div className={styles.productContainer}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={urlFor(product.image[0])} alt={`${product.name} Image`} />
            </div>
            <div className={styles.text}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.description}>{product.details.slice(0, 40)}...</p>
            </div>
            <Link href={`/product/${product.slug.current}`}>
                <a className={styles.button}>View More</a>
            </Link>
        </div>
    );
}