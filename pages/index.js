import React, { useEffect } from "react";
import Head from "next/head";

import { client } from "../lib/client";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Products from "../components/Products";

import { useSelector, useDispatch } from "react-redux";
import { putAppleProducts } from "../redux/slices/appleProductSlice";
import { putSamsungProducts } from "../redux/slices/samsungProductSlice";
import { putXiaomiProducts } from "../redux/slices/xiaomiProductSlice";
import { putBannerProducts } from "../redux/slices/bannerProductSlice";
import { putMobileProducts } from "../redux/slices/mobilesSlice";
import { putHeadphoneProducts } from "../redux/slices/headphonesSlice";
import { putEarphoneProducts } from "../redux/slices/earphonesSlice";
import { setUser } from "../redux/slices/userSlice";

export default function Home({
  appleProductsFetched,
  samsungProductsFetched,
  xiaomiProductsFetched,
  bannerDataFetched,
  mobiles,
  headphones,
  earphones,
}) {
  const appleProducts = useSelector((state) => state.appleProduct.value);
  const samsungProducts = useSelector((state) => state.samsungProduct.value);
  const xiaomiProducts = useSelector((state) => state.xiaomiProduct.value);
  const bannerData = useSelector((state) => state.bannerProduct.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(putAppleProducts(appleProductsFetched));
    dispatch(putSamsungProducts(samsungProductsFetched));
    dispatch(putXiaomiProducts(xiaomiProductsFetched));
    dispatch(putBannerProducts(bannerDataFetched));
    dispatch(putMobileProducts(mobiles));
    dispatch(putHeadphoneProducts(headphones));
    dispatch(putEarphoneProducts(earphones));
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <>
      {bannerData.length && (
        <Hero bannerData={bannerData.length && bannerData[0]} />
      )}
      <Category />
      <Products
        appleProducts={appleProducts}
        samsungProducts={samsungProducts}
        xiaomiProducts={xiaomiProducts}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const mobilesQuery = '*[_type == "product" && category == "mobiles"]';
  const mobiles = await client.fetch(mobilesQuery);

  const headphonesQuery = '*[_type == "product" && category == "headphones"]';
  const headphones = await client.fetch(headphonesQuery);

  const earphonesQuery = '*[_type == "product" && category == "earphones"]';
  const earphones = await client.fetch(earphonesQuery);

  const appleProductsFetched = products.filter(
    (item) => item.company === "apple"
  );
  const samsungProductsFetched = products.filter(
    (item) => item.company === "samsung"
  );
  const xiaomiProductsFetched = products.filter(
    (item) => item.company === "xiaomi"
  );

  const bannerQuery = '*[_type == "banner"]';
  const bannerDataFetched = await client.fetch(bannerQuery);

  return {
    props: {
      appleProductsFetched,
      samsungProductsFetched,
      xiaomiProductsFetched,
      bannerDataFetched,
      mobiles,
      headphones,
      earphones,
    },
  };
};
