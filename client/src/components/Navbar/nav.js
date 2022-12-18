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
                    <Link to='/' active className='navlink' style={{color: '#2DF4FB'}}>Home</Link><br />
                    <Link to='search' className='navlink' style={{color: '#2DF4FB'}}>Browse</Link><br />
                    <Link to='read' className='navlink' style={{color: '#63F82C'}}>Want to Read</Link><br />
                    <Link to='library' className='navlink' style={{color: '#63F82C'}}>Read</Link><br />
                    <Link to='favorites' className='navlink' style={{color: '#63F82C'}}>Favorites</Link><br />
                    <Link to='/' onClick={logout} className='navlink' style={{color: '#E61AF9'}}>Logout</Link><br />
                </ul>

            ) : (
                <ul className='navlinks'>
                    <Link to='/' active className='navlink' style={{color: '#2DF4FB'}}>Home</Link><br />
                    <Link to='search' className='navlink' style={{color: '#2DF4FB'}}>Browse</Link><br />
                    <Link to='read' className='navlink' style={{color: '#63F82C'}}>Want to Read</Link><br />
                    <Link to='library' className='navlink' style={{color: '#63F82C'}}>Read</Link><br />
                    <Link to='favorites' className='navlink' style={{color: '#63F82C'}}>Favorites</Link><br />
                </ul>
            )
    );
};

export default NavBar;