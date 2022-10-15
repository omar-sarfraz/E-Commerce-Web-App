import React from 'react';

import styles from '../styles/products.module.css';
import Link from 'next/link';

import SingleProduct from './SingleProduct';

export default function Products({ appleProducts, samsungProducts, xiaomiProducts }) {
    return (
        <section>
            <div className='container'>
                <h1 className='title'>Apple Products</h1>
                <div className={styles.productsContainer}>
                    {appleProducts.map((item, index) => <SingleProduct product={item} key={index} />)}
                </div>
                <h1 className='title'>Samsung Products</h1>
                <div className={styles.productsContainer}>
                    {samsungProducts.map((item, index) => <SingleProduct product={item} key={index} />)}
                </div>
                <h1 className='title'>Xiaomi Products</h1>
                <div className={styles.productsContainer}>
                    {xiaomiProducts.map((item, index) => <SingleProduct product={item} key={index} />)}
                </div>
            </div>
        </section>
    );
}