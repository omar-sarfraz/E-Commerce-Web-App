import React, { useState } from 'react';
import Link from 'next/link';

import { client, urlFor } from '../../lib/client'
import SingleProduct from '../../components/SingleProduct'

import styles from '../../styles/productPage.module.css'

export default function ProductDetails({ product, products }) {
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className={styles.productPageMain}>
            <div className='container'>
                <div className={styles.main}>
                    <div className={styles.pictureSection}>
                        <div>
                            <div className={styles.mainImageContainer}>
                                <img className={styles.mainImage} src={urlFor(product.image[imageIndex])} alt="Product Image" />
                            </div>
                            <div className={styles.imagesContainer}>
                                {product.image.map((url, index) => (
                                    <div className={styles.imageContainer}>
                                        <img src={urlFor(url)} alt="Product Image" key={index} className={styles.smallImage} onMouseEnter={() => setImageIndex(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentSection}>
                        <h1 className={styles.name}>{product.name || product.productName}</h1>
                        <h4 className={styles.desc}>{product.details || product.description}</h4>
                        <h2 className={styles.price}>Price: {product.price}$</h2>
                        <div className={styles.quantity}>
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                        <div className={styles.buttons}>
                            <Link href="#">
                                <a className={styles.cartButton}>Add to Cart</a>
                            </Link>
                            <Link href="#">
                                <a className={styles.buyButton}>Buy Now</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.recommendation}>
                <h1>You might also like</h1>
                <div className={styles.productsContainer}>
                    {products.map((item, index) => <SingleProduct product={item} key={index} />)}
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type in ["product", "banner"]]{
        slug{
            current
        }
    }`

    const products = await client.fetch(query)

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const query1 = `*[_type in ["product", "banner"] && slug.current == '${slug}'][0]`;
    const product = await client.fetch(query1);

    return {
        props: { product, products }
    }
}