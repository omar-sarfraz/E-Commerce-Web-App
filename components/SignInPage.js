import React, { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GoogleButton } from "react-google-button";
import toast from "react-hot-toast";

import styles from "../styles/signIn.module.css";
import { setUser } from "../redux/slices/userSlice";

import { useSelector, useDispatch } from "react-redux";

export default function SignIn({ setIsSignInOpen }) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = () => {
    toast("Please Wait...");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          firstName: result.user.displayName.split(" ")[0],
          lastName: result.user.displayName.split(" ")[1],
          email: result.user.email,
          address: "",
        };
        toast("Welcome! " + user.firstName);
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
