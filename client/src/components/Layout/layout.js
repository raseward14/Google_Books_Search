import React, { useEffect, useState, useContext } from 'react';
// the Header, Nav, and Footer will all be constant within app
import NavBar from '../Navbar/nav';
import Header from '../header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';
import './style.css'

const Layout = ({ fCount, rCount, wCount }) => {
    const CountContext = React.createContext()
    const value = useContext(CountContext)

    useEffect(() => {
        console.log('navBar want count: ', wCount)
    }, [wCount])

    useEffect(() => {
        console.log('navBar rCount ', rCount)
    }, [rCount])

    useEffect(() => {
        console.log('navBar fav count ', fCount)
    }, [fCount])

    return (
        <div>
            <div className='sidebar'>
                <NavBar
                    tCount={value}
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