import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as authAPIFunctions from '../utils/AuthAPI';
import useAuth from '../hooks/useAuth';

// import axios from '../api/axios';
// const LOGIN_URL = '/auth';

const LoginPage = () => {
    // if we successfully authenticate when we log in, we will set our new Auth state, and store it in the global context
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // this will get where they came from, if nothing, it will default to the homepage
    const from = location.state?.from?.pathname || '/';

    // set focus on first input when the component loads
    const userRef = useRef();
    // will need to set focus on the errors, especially for a screen reader to read
    const errRef = useRef();

    // user and pwd correspond to our inputs
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    // err corresponds to an err we might get back when trying to authenticate
    const [errMsg, setErrMsg] = useState('');

    // set focus on first input when component loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // clears the err message if user changes their user or pwd, they read it, they're adjusting
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    // by default, for form submit reloads the page, so e.preventDefault() prevents that from occurring
    const handleSubmit = async (e) => {
        e.preventDefault();
        // implement axios, and global state for auth - store authentication
        try {

            // const response = await axios.post(LOGIN_URL, 
            //     JSON.stringify({ userName: user, password: pwd}),
            //     {
            //         headers: { 'Content-type': 'application/json'},
            //         withCredentials: true
            //     }
            // )

            let response = await authAPIFunctions.postLogin({
                userName: user,
                password: pwd
            })

            console.log('response data: ', JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            // sessionStorage.setItem('accessToken', accessToken);
            // const roles = response?.data?.roles;
            // we would add roles to this if we had them
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            // form is filled out, we want to navigate away - replaces the success page
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='of'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className='line'>
                    {/*put router link here, the link below is a placeholder*/}
                    {/*<a href='#'>Sign Up</a>*/}
                    <Link to='/'>Sign Up</Link>
                </span>
            </p>
        </section >

    )
};

export default LoginPage;