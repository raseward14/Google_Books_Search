import React from 'react';
import NavBar from '../nav';
import Header from '../header';
import Footer from '../footer';
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <div className='App'>
            <Header title='Google Books Search' />
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};
export default Layout;