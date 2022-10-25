import React from "react";

import styles from "../styles/companyProduct.module.css";
import Link from "next/link";

import { urlFor } from "../lib/client";

export default function SingleProduct({ product }) {
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={urlFor(product.image[0])}
          alt={`${product.name} Image`}
        />
      </div>
      <div className={styles.text}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.description}>{product.details}</p>
      </div>
      <Link href={`/product/${product.slug.current}`}>
        <a className={styles.button}>View More</a>
      </Link>
    </div>
  );
}
