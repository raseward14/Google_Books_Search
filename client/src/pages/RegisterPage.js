import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import * as registerAPIFunctions from '../utils/RegisterAPI'; 

//
const user_regex = /^[a-zA-Z][a-z-A-Z0-9-_]{3,23}$/;
//
const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterPage = () => {
    // allows us to set focus on user input when component loads
    const userRef = useRef();
    // if we get an error, put focus on that so it can be announced by a screenreader for accessibility purposes
    const errRef = useRef();

    // user state, tied to user input
    const [user, setUser] = useState('');
    // boolean tied to whether the name validates or not
    const [validName, setValidName] = useState(false);
    // boolean, whether we are focused on that input field or not
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // state for if an error message exists
    const [errMsg, setErrMsg] = useState('');
    // state for if we successfully submit the registration form or not
    const [success, setSuccess] = useState(false);

    // sets the focus when the component loads, nothing in dependency array, loads once
    // will have to reference the userRef below on that input field
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // applied to the userName, where we validate the userName
    useEffect(() => {
        const result = user_regex.test(user)
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    // to make sure the password and matching password are always in sync
    // runs any time the pwd state || matchPwd state is updated
    useEffect(() => {
        // begin by testing the new pwd against our pwd_regex -> true or false 
        const result = pwd_regex.test(pwd);
        // log the result -> true or false
        console.log(result);
        // log the pwd
        console.log(pwd);
        // result will be T || F -> setValidPwd to T || F
        setValidPwd(result);
        // for the match, set to pwd === matchPwd -> will result in T || F
        const match = pwd === matchPwd
        // set a valid match to T || F
        setValidMatch(match);
    }, [pwd, matchPwd])

    // for error message, any time user changes information, state of one of these 3
    // then we clear out the error message bc user has read err message
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = user_regex.test(user);
        const v2 = pwd_regex.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }
        console.log(user, pwd)
        try {
            const response = await registerAPIFunctions.saveUser({ userName: user, password: pwd})
            console.log(response.data);
            // console.log(response.accessToken)
            setSuccess(true);
            // clear input fields out of registration form - set state back to empty strings
        } catch(err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <h2>Welcome</h2>
            <p>
                Search for a book, then save it! Add books you'd like to read to the <em>Want to Read</em> list, and books you've already read to the <em>Read list</em>.
            </p>
            <p>
                Move books you've already read from the <em>Want to Read List</em>, to the <em>Read List</em>.
            </p>
            <p>
                Add your Favorites from the <em>Read List</em> to the <em>Favorites</em> list.
            </p>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        {/*placeholder link, should be turned into react router link*/}
                        <a href='#'>Sign In</a>
                    </p>
                </section>
            ) : (
                <section className='register'>
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>
                            Username:
                            <span className={validName ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label><br />
                        <input
                            type='text'
                            id='username'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalild={validName ? 'false' : 'true'}
                            aria-describeby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        /><br />
                        <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor='password'>
                            Password:
                            <span className={validPwd ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label><br />
                        <input
                            type='password'
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describeby='pwdnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        /><br />
                        <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label='exclamation mark'>!</span><span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>
                        </p>


                        <label htmlFor='confirm_pwd'>
                            Confirm Password:
                            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label><br />
                        <input
                            type='password'
                            id='confirm_pwd'
                            required
                            onChange={(e) => setMatchPwd(e.target.value)}
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describeby='confirm_note'
                            onFocus={() => setMatchFocus(true)}
                            onBlue={() => setMatchFocus(false)}
                        /><br />
                        <p id='confirm_note' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                        <p>
                            Already Registered?<br />
                            <span className='line'>
                                {/*put router link here*/}
                                <a href='#'>Sign In</a>
                            </span>
                        </p>
                    </form>
                </section>
            )
            }
        </>
    );
};
export default RegisterPage;