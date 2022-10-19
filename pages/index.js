import React, { useEffect } from 'react'
import Head from 'next/head'

import { client } from '../lib/client';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Products from '../components/Products';

import { useSelector, useDispatch } from 'react-redux'
import { putAppleProducts } from '../redux/slices/appleProductSlice'
import { putSamsungProducts } from '../redux/slices/samsungProductSlice'
import { putXiaomiProducts } from '../redux/slices/xiaomiProductSlice'
import { putBannerProducts } from '../redux/slices/bannerProductSlice'

export default function Home({ appleProductsFetched, samsungProductsFetched, xiaomiProductsFetched, bannerDataFetched }) {

  const appleProducts = useSelector((state) => state.appleProduct.value)
  const samsungProducts = useSelector((state) => state.samsungProduct.value)
  const xiaomiProducts = useSelector((state) => state.xiaomiProduct.value)
  const bannerData = useSelector((state) => state.bannerProduct.value)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(putAppleProducts(appleProductsFetched))
    dispatch(putSamsungProducts(samsungProductsFetched))
    dispatch(putXiaomiProducts(xiaomiProductsFetched))
    dispatch(putBannerProducts(bannerDataFetched))
  }, [])

  return (
    <>
      {bannerData.length && <Hero bannerData={bannerData.length && bannerData[0]} />}
      <Category />
      <Products appleProducts={appleProducts} samsungProducts={samsungProducts} xiaomiProducts={xiaomiProducts} />
    </>
  )
}

export const getServerSideProps = async () => {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const appleProductsFetched = products.filter((item) => item.company === 'apple');
  const samsungProductsFetched = products.filter((item) => item.company === 'samsung');
  const xiaomiProductsFetched = products.filter((item) => item.company === 'xiaomi');

  const bannerQuery = '*[_type == "banner"]';
  const bannerDataFetched = await client.fetch(bannerQuery);

  return {
    props: { appleProductsFetched, samsungProductsFetched, xiaomiProductsFetched, bannerDataFetched }
  }
}
