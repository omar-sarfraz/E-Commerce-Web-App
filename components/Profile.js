import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { signOut } from "firebase/auth";
import { ref, set } from "firebase/database";

import styles from "../styles/profile.module.css";
import { auth, database } from "../lib/firebase";

import { useDispatch } from "react-redux";
import { setUser, setAddress } from "../redux/slices/userSlice";

export default function Profile({ setIsProfileOpen, setIsSignInOpen }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = database;
    const dbRef = ref(db, `/users/${user.uid}`);
    await set(dbRef, {
      address: user.address,
    });
    setIsProfileOpen(false);
    toast("Address updated! ✔");
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSignOut = () => {
    toast("Signed Out");
    signOut(auth);
    setIsProfileOpen(false);
    setIsSignInOpen(true);
    dispatch(setUser({}));
    localStorage.clear();
  };

  return (
    <div className={styles.profileMain}>
      <p>User Information</p>
      <button onClick={() => setIsProfileOpen(false)} className={styles.cross}>
        X
      </button>
      <button onClick={handleSignOut} className={styles.signOutButton}>
        Sign Out
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          disabled={true}
          defaultValue={user.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          disabled={true}
          defaultValue={user.lastName}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          disabled={true}
          defaultValue={user.email}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={user.address}
          defaultValue={user.address}
          onChange={(e) => dispatch(setAddress(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
