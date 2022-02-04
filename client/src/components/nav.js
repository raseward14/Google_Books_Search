import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <>
        <Link to='/' active>Home</Link>
        <Link href='search'>Search</Link>
        <Link href='read'>To Read</Link>
        <Link href='library'>Books I've Read</Link>
        <Link href='favorites'>My Favorites</Link>
        </>
    );
};
export default NavBar;