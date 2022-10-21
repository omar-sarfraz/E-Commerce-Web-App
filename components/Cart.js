import React from 'react';

import styles from '../styles/cart.module.css';
import Link from 'next/link';
import { urlFor } from '../lib/client';

import { useSelector } from 'react-redux';

export default function Cart({ setIsCartOpen }) {
    const cart = useSelector((state) => state.cart.value)

    return (
        <div className={styles.cartMain} onBlur={() => setIsCartOpen(false)}>
            <div className={styles.items}>
                <p>Total Items: {cart.totalProducts}</p>
                <button onClick={() => setIsCartOpen(prev => !prev)} className={styles.cross}>X</button>
            </div>
            <div className={styles.productsContainer}>
                {cart.products.map((product) => {
                    return (
                        <div className={styles.products}>
                            <div className={styles.productImageContainer}>
                                <img src={urlFor(product.image[0])} alt={product.name + ' image'} className={styles.productImage} />
                            </div>
                            <div className={styles.description}>
                                <h3 className={styles.name}>{product.name || product.productName}</h3>
                                <h6 className={styles.desc}>{product.details ? product.details.slice(0, 30) : product.description.slice(0, 30)}... </h6>
                                <h5 className={styles.price}>Price: {product.price}$</h5>
                                <h5 className={styles.quantity}>Quantity: {product.quantity}</h5>
                            </div>
                            <div className={styles.functions}>
                                <button className={styles.productCross}>X</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.bottom}>
                <p className={styles.totalPrice}>Total Price: {cart.totalPrice}$</p>
                <Link href="#">
                    <a className={styles.checkout}>Proceed to Checkout</a>
                </Link>
            </div>
        </div>
    );
}