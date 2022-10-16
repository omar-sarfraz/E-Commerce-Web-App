import React from 'react';

import styles from '../styles/companyProducts.module.css';
import Link from 'next/link';

import CompanyProduct from './CompanyProduct';

export default function Products({ title, products }) {
    return (
        <section>
            <div className='container'>
                <div className={styles.titleContainer}><h1 className={styles.title}>{title}</h1></div>
                <div className={styles.productsContainer}>
                    {products.map((item, index) => <CompanyProduct product={item} key={index} />)}
                </div>
            </div>
        </section>
    );
}