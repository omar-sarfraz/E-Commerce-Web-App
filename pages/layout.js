import React from 'react'

import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div>{children}</div>
            <Toaster />
        </>
    )
}

export default Layout