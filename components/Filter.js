import React, { useState } from "react";

import styles from "../styles/filter.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFilteredData } from "../redux/slices/filterDataSlice";

export default function Filter({ data }) {
  const dispatch = useDispatch();

  const [rangeFilter, setRangeFilter] = useState({
    start: 0,
    end: 10000,
  });

  const [sort, setSort] = useState("Ascending");

  useEffect(() => {
    handleFilter();
  }, [sort]);

  useEffect(() => {
    handleFilter();
  }, [data]);

  const handleInput = (e) => {
    setRangeFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    if (e.target.value === "Ascending") {
      setSort("Ascending");
    } else {
      setSort("Descending");
    }

    handleFilter();
  };

  const handleFilter = () => {
    let filteredData = [...data];
    if (sort) {
      if (sort === "Ascending") {
        filteredData.sort((a, b) => (a.price < b.price ? -1 : 1));
      } else if (sort === "Descending") {
        filteredData.sort((a, b) => (a.price > b.price ? -1 : 1));
      }
    }

    filteredData = filteredData.filter(
      (item) => item.price >= rangeFilter.start && item.price <= rangeFilter.end
    );

    dispatch(setFilteredData(filteredData));
  };

  return (
    <div className={styles.filterOuter}>
      <h2>Filters</h2>
      <div className={styles.filterMain}>
        <div className={styles.button_range}>
          <div className={styles.range}>
            <label>Range</label>
            <input
              type="number"
              name="start"
              required
              defaultValue={rangeFilter.start}
              onChange={(e) => handleInput(e)}
            />
            -
            <input
              type="number"
              name="end"
              required
              defaultValue={rangeFilter.end}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className={styles.button} onClick={handleFilter}>
            <button>Apply</button>
          </div>
        </div>
        <div className={styles.selection}>
          <select onChange={(e) => handleSelect(e)}>
            <option selected>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
