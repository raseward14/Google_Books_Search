import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    // set focus on first input when the component loads
    const userRef = useRef();
    // will need to set focus on the errors, especially for a screen reader to read
    const errRef = useRef();

    // user and pwd correspond to our inputs
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    // err corresponds to an err we might get back when trying to authenticate
    const [errMsg, setErrMsg] = useState('');
    // just for this tutorial, will be replaced with react router to navigate to page of choice after successful login 
    const [success, setSuccess] = useState(false);

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
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }


    return (

        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1><br />
                    <p>
                        <a href='#'>Go to Home</a>
                    </p>
                </section>
            ) : (
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
                </section>
            )}
        </>
    )
};

export default LoginPage;