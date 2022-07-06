import { useRef, useState, useEffect } from 'react';

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

    // 
    return (
        <section>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
        <h1>Sign In</h1>
        <form>
            <label htmlFor='username'>Username:</label>
            <input id='username' />
            <label htmlFor=''></label>
            <input />
        </form>
        </section>
    )

};

export default LoginPage;