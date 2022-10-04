import React from 'react';

import styles from '../styles/products.module.css';
import Link from 'next/link';

import SingleProduct from './SingleProduct';

export default function Products({ products }) {
    return (
        <section>
            <div className='container'>
                <h1 className='title'>Products</h1>
                <div className={styles.productsContainer}>
                    {products.map(item => <SingleProduct product={item} />)}
                </div>
            </div>
        </section>
    );
}