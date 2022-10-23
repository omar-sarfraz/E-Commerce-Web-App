import React from 'react';

import styles from '../styles/cart.module.css';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import toast from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeProduct } from '../redux/slices/cartSlice';

export default function Cart({ setIsCartOpen }) {
    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()

    const removeProductLocal = (product) => {
        dispatch(removeProduct(product))
        toast(`${product.name || product.productName} removed from cart ☑️`)
    }

    return (
        <div className={styles.cartMain}>
            {!cart.products.length
                ?
                <div className={styles.empty}>
                    <button onClick={() => setIsCartOpen(prev => !prev)} className={styles.emptyCross}>X</button>
                    <h2>Cart is empty</h2>
                    <button className={styles.continueShopping} onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
                </div>
                :
                <>
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
                                        <div className={styles.quantity}>
                                            <button onClick={() => dispatch(decreaseQty(product))}>-</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => dispatch(increaseQty(product))}>+</button>
                                        </div>
                                    </div>
                                    <div className={styles.functions}>
                                        <button className={styles.productCross} onClick={() => removeProductLocal(product)}>X</button>
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
                </>
            }
        </div>
    );
}