import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";

import SignInPage from "../components/SignInPage";
import { setUser } from "../redux/slices/userSlice";

function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.value);
  const [isSignInOpen, setIsSignInOpen] = useState(
    !user.address ? true : false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      if (user) dispatch(setUser(user));
      if (user.address) setIsSignInOpen(false);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isSignInOpen ? (
            <SignInPage setIsSignInOpen={setIsSignInOpen} />
          ) : (
            <>
              <Navbar setIsSignInOpen={setIsSignInOpen} />
              <div>{children}</div>
              <Toaster />
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Layout;
