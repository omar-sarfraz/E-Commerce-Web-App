import Head from 'next/head'
import Image from 'next/image'

import { client } from '../lib/client';

export default function Home({ products, bannerData }) {
  return (
    <div>{products[0].name}</div>
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
