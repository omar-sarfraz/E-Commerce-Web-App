import React from "react";

import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Toaster />
      <Footer />
    </>
  );
}

export default Layout;
