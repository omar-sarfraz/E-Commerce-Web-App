import React, { useState } from "react";

import styles from "../../styles/companyProducts.module.css";
import Link from "next/link";

import CompanyProduct from "../../components/CompanyProduct";
import Filter from "../../components/Filter";
import searchStyles from "../../styles/search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setSearchData } from "../../redux/slices/searchDataSlice";

export default function Search() {
  const filterData = useSelector((state) => state.filterData.value);
  const searchData = useSelector((state) => state.searchData.value);
  const data = useSelector((state) => state.products.value);
  const [searchText, setSearchText] = useState("No search result");

  const dispatch = useDispatch();

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
      console.log(item.category);
    });

    if (!searchedArray.length) {
      dispatch(setSearchData(""));
      setSearchText("No product found");
      return;
    }

    dispatch(setSearchData(searchedArray));
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
        <Filter data={searchData} />
        <div className={styles.productsContainer}>
          {filterData.length ? (
            filterData.map((item, index) => (
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
