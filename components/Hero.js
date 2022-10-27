import React from "react";

import styles from "../styles/hero.module.css";
import Link from "next/link";
import { urlFor } from "../lib/client";

export default function Hero({ bannerData }) {
  return (
    <div className={styles.heroMain}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroImage}>
            <img
              src={urlFor(bannerData.image[0])}
              alt={`${bannerData.productName} Image`}
              className={styles.heroImageInner}
            />
          </div>
          <div className={styles.text}>
            <p className={styles.subHeading}>{bannerData.productName}</p>
            <p className={styles.heading}>{bannerData.bigTitle}</p>
            <p className={styles.description}>{bannerData.description}</p>
            <p className={styles.buyHeading}>
              Now availible at {bannerData.price}$
            </p>
            <div className={styles.linkWrapper}>
              <Link href={`/product/${bannerData.slug.current}`}>
                <a className={styles.buyButton}>{bannerData.buttonText}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
