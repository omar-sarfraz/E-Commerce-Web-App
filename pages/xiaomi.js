import React from 'react'
import Head from 'next/head'

import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import CompanyProducts from '../components/CompanyProducts';

export default function Xiaomi() {
    const xiaomiProducts = useSelector((state) => state.xiaomiProduct.value)

    return (
        <>
            <Navbar />
            <CompanyProducts title={"Xiaomi Products"} products={xiaomiProducts} />
        </>
    )
}