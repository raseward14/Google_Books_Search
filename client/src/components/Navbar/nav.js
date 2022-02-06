import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const NavBar = () => {
    return (
        <ul className='navlinks'>
        <Link to='/' active className='navlink'>Home</Link>
        <Link to='search' className='navlink'>Search</Link>
        <Link to='read' className='navlink'>Read</Link>
        <Link to='library' className='navlink'>Library</Link>
        <Link to='favorites' className='navlink'>Favorites</Link>
        </ul>
    );
};

export default NavBar;