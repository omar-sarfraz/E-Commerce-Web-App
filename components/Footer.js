import React from "react";

import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerOuter}>
      <div className={styles.footer}>
        <p>
          For any queries or feedback. Reach us at <span>sample@gmail.com</span>
        </p>
      </div>
    </div>
  );
}
