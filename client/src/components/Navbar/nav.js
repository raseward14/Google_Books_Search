import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import useAuth from '../../hooks/useAuth';
import * as registerAPIFunctions from '../../utils/RegisterAPI';


const NavBar = () => {
    const { auth } = useAuth();
    // state for if an error message exists
    const [errMsg, setErrMsg] = useState('');


    const logout = async (e) => {
        console.log('clicked')
        try {
            const response = await registerAPIFunctions.logout()
            sessionStorage.clear();
            auth.user = null;
            window.location.reload(false);
            console.log(response.data)
        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response');
            } else if (err?.response) {
                console.log(err.response)
            } else {
                console.log('You logged out!')
            }
        }
    }


    return (
        auth?.user
            ? (
                <ul className='navlinks'>
                    <Link to='/' active className='navlink'>Home</Link>
                    <Link to='search' className='navlink'>Browse</Link>
                    <Link to='read' className='navlink'>Want to Read</Link>
                    <Link to='library' className='navlink'>Read</Link>
                    <Link to='favorites' className='navlink'>Favorites</Link>
                    <Link to='/' onClick={logout} className='navlink'>Logout</Link>
                </ul>

            ) : (
                <ul className='navlinks'>
                    <Link to='/' active className='navlink'>Home</Link>
                    <Link to='search' className='navlink'>Browse</Link>
                    <Link to='read' className='navlink'>Want to Read</Link>
                    <Link to='library' className='navlink'>Read</Link>
                    <Link to='favorites' className='navlink'>Favorites</Link>
                </ul>
            )
    );
};

export default NavBar;