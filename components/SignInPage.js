import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GoogleButton } from "react-google-button";
import toast from "react-hot-toast";

import styles from "../styles/signIn.module.css";
import { setUser } from "../redux/slices/userSlice";
import { auth, database } from "../lib/firebase";
import { get, ref } from "firebase/database";

import { useSelector, useDispatch } from "react-redux";

export default function SignIn({ setIsSignInOpen }) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = () => {
    toast("Please Wait...");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        let user = {
          uid: result.user.uid,
          firstName: result.user.displayName.split(" ")[0],
          lastName: result.user.displayName.split(" ")[1],
          email: result.user.email,
        };
        toast("Welcome! " + user.firstName);
        const db = database;
        const dbref = ref(db, `/users/${user.uid}/`);
        get(dbref).then((snapshot) => {
          if (snapshot.exists()) {
            const getAddress = snapshot.val().address;
            user = { ...user, address: getAddress };
          } else {
            user = { ...user, address: "" };
          }
          dispatch(setUser(user));
          localStorage.setItem("user", JSON.stringify(user));
        });
        dispatch(setUser(user));
        setIsSignInOpen(false);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        setError("An error has occured during sign in! Please try again!");
      });
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.signInInner}>
        <p className={styles.info}>
          Sign In to store your shipping address information so you can shop
          with ease
        </p>
        <div>
          <p className={styles.error}>{error}</p>
          <GoogleButton onClick={handleSignIn} />
        </div>
      </div>
    </div>
  );
}
