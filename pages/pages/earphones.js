import React from "react";
import Head from "next/head";

import { useSelector } from "react-redux";

import CompanyProducts from "../../components/CompanyProducts";

export default function Apple() {
  const earphoneProducts = useSelector((state) => state.earphone.value);

  return (
    <>
      <CompanyProducts title={"Earphones"} products={earphoneProducts} />
    </>
  );
}
