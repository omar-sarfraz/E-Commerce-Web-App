import React from 'react';

import styles from '../styles/category.module.css';
import Link from 'next/link';

export default function Category() {
    return (
        <section>
            <div className='container'>
                <h1 className='title'>Categories</h1>
                <div className={styles.links}>
                    <Link href="#">
                        <a className={styles.categories}>Mobiles</a>
                    </Link>
                    <Link href="#">
                        <a className={styles.categories}>Headphones</a>
                    </Link>
                    <Link href="#">
                        <a className={styles.categories}>Earphones</a>
                    </Link>
                </div>
            </div>
        </section>
    );
}