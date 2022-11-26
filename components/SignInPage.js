import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleButton } from "react-google-button";
import toast from "react-hot-toast";

import styles from "../styles/signIn.module.css";
import { setUser } from "../redux/slices/userSlice";
import { auth, database } from "../lib/firebase";
import { get, ref } from "firebase/database";

import { useSelector, useDispatch } from "react-redux";

export default function SignIn({ setIsSignInOpen, setSignIn }) {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  function handleChange() {
    setSignIn(false);
  }

  function handlePasswordSignIn() {
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Incorrect Email");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return;
    }

    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        let user = {
          uid: userCred.user.uid,
          email: userCred.user.email,
        };

        getUser(user);
      })
      .catch((e) => {
        if (e.code === "auth/user-not-found") setError("User does not exist");
        else if (e.code === "auth/wrong-password") setError("Wrong password");
        else setError("An error occured please try again!");
        console.log(e.code);
      });
  }

  async function getUser(user) {
    const db = database;
    const dbref = ref(db, `/users/${user.uid}/`);
    get(dbref).then((snapshot) => {
      if (snapshot.exists()) {
        const getAddress = snapshot.val().address;
        const getFirstName = snapshot.val().firstName;
        const getLastName = snapshot.val().lastName;
        user = {
          ...user,
          address: getAddress,
          firstName: getFirstName,
          lastName: getLastName,
        };
      } else {
        user = { ...user, address: "", firstName: "", lastName: "" };
      }
      toast("Welcome! " + user.firstName);
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
    });
    dispatch(setUser(user));
    setIsSignInOpen(false);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInInner}>
        <p className={[styles.info, styles.heading].join(" ")}>Sign In</p>
        <div className={styles.signInEmail}>
          <div className={styles.email}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter you email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.password}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter you password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handlePasswordSignIn}>
            Sign In
          </button>
        </div>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <p className={styles.info}>Or</p>
        )}
        <div>
          <GoogleButton onClick={handleSignIn} />
        </div>
        <p className={[styles.footer, styles.info].join(" ")}>
          Don&apos;t have an account?{" "}
          <button onClick={handleChange}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}
