import React from "react";

import styles from "../styles/companyProducts.module.css";
import Link from "next/link";

import { useSelector } from "react-redux";

import CompanyProduct from "./CompanyProduct";
import Filter from "./Filter";

export default function Products({ title, products }) {
  const filterData = useSelector((state) => state.filterData.value);

  return (
    <section>
      <div className="container">
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <Filter data={products} />
        <div className={styles.productsContainer}>
          {filterData.length ? (
            filterData.map((item, index) => (
              <CompanyProduct product={item} key={index} />
            ))
          ) : (
            <p className={styles.noProducts}>No product found</p>
          )}
        </div>
      </div>
    </section>
  );
}
