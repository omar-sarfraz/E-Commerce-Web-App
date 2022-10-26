import React from "react";

import styles from "../styles/profile.module.css";

export default function Profile({ setIsProfileOpen }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.profileMain}>
      <p>User Information</p>
      <button onClick={() => setIsProfileOpen(false)} className={styles.cross}>
        X
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" disabled={true} />
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" disabled={true} />
        <label for="email">Email</label>
        <input type="text" id="email" disabled={true} />
        <label for="address">Address</label>
        <input type="text" id="address" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
