import React from 'react'
import Head from 'next/head'

import { useSelector } from 'react-redux';

import CompanyProducts from '../../components/CompanyProducts';

export default function Samsung() {
    const samsungProducts = useSelector((state) => state.samsungProduct.value)

    return (
        <>
            <CompanyProducts title={"Samsung Products"} products={samsungProducts} />
        </>
    )
}