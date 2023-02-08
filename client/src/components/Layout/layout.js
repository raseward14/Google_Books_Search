import React, { useEffect, useState } from 'react';
// the Header, Nav, and Footer will all be constant within app
import NavBar from '../Navbar/nav';
import Header from '../header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';
import './style.css'

const Layout = () => {
    
    return (
        <div>
            <div className='sidebar'>
                <NavBar />
            </div>
            <div className='App'>
                <Header title='Blurb Books' />
                <Outlet />
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;