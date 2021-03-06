import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const NavBar = () => {
    return (
        <ul className='navlinks'>
            <Link to='/' active className='navlink'>Home</Link>
            <Link to='search' className='navlink'>Browse</Link>
            <Link to='read' className='navlink'>Want to Read</Link>
            <Link to='library' className='navlink'>Read</Link>
            <Link to='favorites' className='navlink'>Favorites</Link>
        </ul>
    );
};

export default NavBar;