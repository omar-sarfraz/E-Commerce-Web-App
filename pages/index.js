import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { client } from '../lib/client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function Home({ products, bannerData }) {
  return (
    <>
      <Navbar />
      <Hero bannerData={bannerData.length && bannerData[0]} />
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
