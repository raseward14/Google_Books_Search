import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import useAuth from '../../hooks/useAuth';
import * as registerAPIFunctions from '../../utils/RegisterAPI';


const NavBar = ({ fCount, rCount, wCount }) => {
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
                    <table>
                        <tbody>
                            <tr>
                                <td><Link to='/' active className='navlink' style={{ color: '#2DF4FB' }}>Home</Link></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='search' className='navlink' style={{ color: '#2DF4FB' }}>Browse</Link></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='read' className='navlink' style={{ color: '#63F82C' }}>Want to Read</Link></td>
                                <td><span className='count'>{wCount}</span></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='library' className='navlink' style={{ color: '#63F82C' }}>Read</Link></td>
                                <td><span className='count'>{rCount}</span></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='favorites' className='navlink' style={{ color: '#63F82C' }}>Favorites</Link></td>
                                <td><span className='count'>{fCount}</span></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='/' onClick={logout} className='navlink' style={{ color: '#E61AF9' }}>Logout</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
            ) : (
                <ul className='navlinks'>
                    <table>
                        <tbody>
                            <tr>
                                <td><Link to='/' active className='navlink' style={{ color: '#2DF4FB' }}>Home</Link></td>
                            </tr>
                            <tr>
                                <td><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='search' className='navlink' style={{ color: '#2DF4FB' }}>Browse</Link></td>
                            </tr>
                            <tr>
                                <td><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='read' className='navlink' style={{ color: '#63F82C' }}>Want to Read</Link></td>
                            </tr>
                            <tr>
                                <td><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='library' className='navlink' style={{ color: '#63F82C' }}>Read</Link></td>
                            </tr>
                            <tr>
                                <td><div className='line-break' /></td>
                            </tr><br />
                            <tr>
                                <td><Link to='favorites' className='navlink' style={{ color: '#63F82C' }}>Favorites</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
            )
    );
};

export default NavBar;