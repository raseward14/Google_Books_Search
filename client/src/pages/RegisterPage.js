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

    const [match, setMatch] = useState('');
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
    },[]);

    // applied to the userName, where we validate the userName
    useEffect(() => {
        const result = user_regex.test(user)
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user]);
    // timestamp 7:43

    // to make sure the password and matching password are always in sync
    useEffect(() => {

    },[pwd, match]);

    // this one runs if an error is thrown, user will update one of the three fields
    useEffect(() => {

    },[user, pwd, match])

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
            <div className='register'>
                <h2>Register</h2>
                <span>Username:</span><br />
                <input></input><br />
                <span>Password:</span><br />
                <input></input><br />
                <span>Confirm Password:</span><br />
                <input></input><br />
                <button>Sign Up</button>
                <p>Already Registered?</p>
                <a>Sign In</a>
            </div>
        </>
    );
};
export default RegisterPage;