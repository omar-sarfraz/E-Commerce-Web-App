import React from 'react'
import Head from 'next/head'

import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import CompanyProducts from '../components/CompanyProducts';

export default function Apple() {
    const appleProducts = useSelector((state) => state.appleProduct.value)

    return (
        <>
            <Navbar />
            <CompanyProducts title={"Apple Products"} products={appleProducts} />
        </>
    )
}