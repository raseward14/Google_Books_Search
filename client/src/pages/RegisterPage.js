import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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


    // label element has htmlFor attribute that needs to match ID of the input
    // autocomplete set to off, dont want to see previous values suggested for this field
    // useRef={userRef} allows us to set focus in this input on page load
    // aria-invalid set to true when component loads - ternary so if we do have a valid user name that has passed validation, this will be set to false - allows screen reader announce whether this input field needs adjusted before the form is submitted
    // aria-describeby lets us provide another element that describes the input field so a screenreader will read the label first, what type of input the label is addressing, then it will read aria-invalid, whether it has a valid input or not, then will jump to aria describeby 
    // where we put in requirements that our registration form needs, have a screenreader read those
    // onFocus -> if user input field has focus, setting this boolean to true
    // onBlur, when user leaves this field, we're setting this boolean to false
    // 14:02
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
            <section className='register'>
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h2>Register</h2>
                <form>
                    <label htmlFor='username'>
                        Username:
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
                    <label htmlFor='password'>
                        Password:
                    </label><br />
                    <input 
                        id='password'
                    /><br />
                    <label htmlFor=''>
                        Confirm Password:
                    </label><br />
                    <input 
                    /><br />
                    <button>Sign Up</button>
                    <p>Already Registered?</p>
                    <a>Sign In</a>
                </form>
            </section>
        </>
    );
};
export default RegisterPage;