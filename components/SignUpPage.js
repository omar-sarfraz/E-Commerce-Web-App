import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

import styles from "../styles/signUp.module.css";
import { setUser } from "../redux/slices/userSlice";
import { auth, database } from "../lib/firebase";
import { set, ref } from "firebase/database";
import ReactLoading from "react-loading";

import { useDispatch } from "react-redux";

export default function SignUp({ setIsSignInOpen, setSignIn }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !address) {
      setError("All fields are required");
      return;
    }

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
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        let user = {
          uid: userCred.user.uid,
          firstName: firstName,
          lastName: lastName,
          email: userCred.user.email,
          address: address,
        };

        postUser(user);

        setLoading(false);
        dispatch(setUser(user));
        toast("Welcome! " + user.firstName);
        setIsSignInOpen(false);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("Email Already Exists");
        } else
          setError("An error has occured during sign up! Please try again!");
        setLoading(false);
      });
  };

  async function postUser(user) {
    const db = database;
    const dbRef = ref(db, `/users/${user.uid}`);
    await set(dbRef, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
    });
  }

  function handleChange() {
    setSignIn(true);
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpInner}>
        <p className={[styles.info, styles.heading].join(" ")}>Sign Up</p>
        <div className={styles.signUpEmail}>
          <div className={styles.firstName}>
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter you first name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.lastName}>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter you last name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <div className={styles.address}>
            <label>Shipping Address</label>
            <input
              type="text"
              placeholder="Enter you address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleRegister}>
            {loading ? (
              <ReactLoading
                type={"bars"}
                color={"#ffffff"}
                height={"10%"}
                width={"10%"}
              />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <p className={styles.error}>{error}</p>
        <p className={[styles.footer, styles.info].join(" ")}>
          Already have an account?{" "}
          <button onClick={handleChange}>Sign In</button>
        </p>
      </div>
    </div>
  );
}
