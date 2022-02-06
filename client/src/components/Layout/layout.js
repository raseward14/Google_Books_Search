import React from 'react';
// the Header, Nav, and Footer will all be constant within app
import NavBar from '../Navbar/nav';
import Header from '../header';
import Footer from '../Footer/footer';
import { Outlet } from 'react-router-dom';
import './style.css'

const Layout = ({ search, setSearch }) => {
    return (
        <div className='App'>
            <Header title='Google Books Search' />
            <NavBar search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;