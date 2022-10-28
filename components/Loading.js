import React from "react";
import ReactLoading from "react-loading";

import styles from "../styles/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingOuter}>
      <ReactLoading
        type={"bars"}
        color={"#ffffff"}
        height={"5%"}
        width={"5%"}
      />
      <p>Loading</p>
    </div>
  );
}
