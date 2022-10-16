import React from 'react'
import Head from 'next/head'

import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import Products from '../components/Products';

export default function apple() {
    const appleProducts = useSelector((state) => state.appleProduct.value)

    return (
        <>
            <Navbar />
        </>
    )
}