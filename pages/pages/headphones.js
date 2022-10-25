import React from "react";
import Head from "next/head";

import { useSelector } from "react-redux";

import CompanyProducts from "../../components/CompanyProducts";

export default function Apple() {
  const headphoneProducts = useSelector((state) => state.headphone.value);

  return (
    <>
      <CompanyProducts title={"Headphones"} products={headphoneProducts} />
    </>
  );
}
