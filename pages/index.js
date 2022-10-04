import React from 'react'
import Head from 'next/head'

import { client } from '../lib/client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Products from '../components/Products';

export default function Home({ products, bannerData }) {
  return (
    <>
      <Navbar />
      <Hero bannerData={bannerData.length && bannerData[0]} />
      <Category />
      <Products products={products} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}
