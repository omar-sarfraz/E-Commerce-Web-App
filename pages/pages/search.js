import React, { useState } from "react";

import styles from "../../styles/companyProducts.module.css";
import Link from "next/link";

import CompanyProduct from "../../components/CompanyProduct";
import searchStyles from "../../styles/search.module.css";
import { useSelector } from "react-redux";

export default function Search() {
  const [products, setProducts] = useState("");
  const data = useSelector((state) => state.products.value);
  const [searchText, setSearchText] = useState(
    "Search for your favourite products"
  );

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    let pattern = search.toLowerCase();
    let searchedArray = data.filter((item) => {
      if (
        item.name.toLowerCase().includes(pattern) ||
        item.category.toLowerCase().includes(pattern) ||
        item.details.toLowerCase().includes(pattern)
      ) {
        return true;
      }
    });

    if (!searchedArray.length) {
      setProducts("");
      setSearchText("No product found");
      return;
    }

    setProducts(searchedArray);
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section>
      <div className="container">
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Search Products</h1>
        </div>
        <div className={searchStyles.input}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => keyPressed(e)}
          />
          <button className={searchStyles.searchIcon} onClick={handleSearch}>
            <img
              src="/assets/search.svg"
              width="28px"
              height="28px"
              alt="Search"
            />
          </button>
        </div>
        <div
          className={[
            styles.productsContainer,
            searchStyles.productsContainer,
          ].join(" ")}
        >
          {products ? (
            products.map((item, index) => (
              <CompanyProduct product={item} key={index} />
            ))
          ) : (
            <p className={searchStyles.noProducts}>{searchText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
