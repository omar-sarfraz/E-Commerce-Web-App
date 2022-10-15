import React from 'react'
import Head from 'next/head'

import { client } from '../lib/client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Products from '../components/Products';

export default function Home({ appleProducts, samsungProducts, xiaomiProducts, bannerData }) {
  return (
    <>
      <Navbar />
      <Hero bannerData={bannerData.length && bannerData[0]} />
      <Category />
      <Products appleProducts={appleProducts} samsungProducts={samsungProducts} xiaomiProducts={xiaomiProducts} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const appleProducts = products.filter((item) => item.company === 'apple');
  const samsungProducts = products.filter((item) => item.company === 'samsung');
  const xiaomiProducts = products.filter((item) => item.company === 'xiaomi');

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { appleProducts, samsungProducts, xiaomiProducts, bannerData }
  }
}
