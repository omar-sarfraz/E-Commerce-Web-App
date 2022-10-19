import React from 'react';

import { client, urlFor } from '../../lib/client'

import styles from '../../styles/productPage.module.css'

export default function ProductDetails({ product, products }) {
    return (
        <div className='container'>
            <div className={styles.main}>
                <div className={styles.pictureSection}>
                    <div>
                        <div className={styles.mainImageContainer}>
                            <img className={styles.mainImage} src={urlFor(product.image[0])} alt="Product Image" />
                        </div>
                        <div className={styles.imagesContainer}>
                            {product.image.map((url, index) => (
                                <div className={styles.imageContainer}>
                                    <img src={urlFor(url)} alt="Product Image" key={index} className={styles.smallImage} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.contentSection}>
                    <div>
                        Product Details
                    </div>
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