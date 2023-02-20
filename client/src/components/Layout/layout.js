import React, { useEffect, useState, useContext } from 'react';
// the Header, Nav, and Footer will all be constant within app
import NavBar from '../Navbar/nav';
import Header from '../header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';
import './style.css'

const Layout = ({ fCount, rCount, wCount }) => {

    useEffect(() => {
        console.log('layout.js want: ', wCount)
    }, [wCount])

    useEffect(() => {
        console.log('layout.js read: ', rCount)
    }, [rCount])

    useEffect(() => {
        console.log('layout.js fav: ', fCount)
    }, [fCount])

    return (
        <div>
            <div className='sidebar'>
                <NavBar
                    fCount={fCount}
                    rCount={rCount}
                    wCount={wCount} />
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