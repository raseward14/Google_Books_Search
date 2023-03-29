import React, { useEffect, useState, useContext } from 'react';
// the Header, Nav, and Footer will all be constant within app
import NavBar from '../Navbar/nav';
import Header from '../header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';
import './style.css'
import Burger from '../Burger/burger';


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
                <table>
                    <tbody>
                        <tr>
                            <th className='burger'>
                                <Burger />
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