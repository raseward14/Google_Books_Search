import React, { useEffect, useState, useContext } from 'react';
// the Header, Nav, and Footer will all be constant within app
import NavBar from '../Navbar/nav';
import Header from '../header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';
import './style.css'
import Burger from '../Burger/burger';
import logo from '../Images/2023-07-06_18-05-18.png'


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
                <img
                    src={logo}
                    style={{
                        'width': '100%'
                    }} />
                <NavBar
                    fCount={fCount}
                    rCount={rCount}
                    wCount={wCount} />
            </div>
            <div className='App'>
                <table>
                    <tbody>
                        <tr>
                            <th className='burger'>
                                <Burger
                                    fCount={fCount}
                                    rCount={rCount}
                                    wCount={wCount} />
                            </th>
                            <th>
                                <Header title='Blurb Books' />
                            </th>
                        </tr>
                    </tbody>
                </table>
                <Outlet />
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;