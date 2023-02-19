import React, { useState, useEffect } from 'react';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as favAPIFunctions from '../utils/FavoriteAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBook, faCheck, faBookOpen, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";


const WantToReadPage = ({ appReadCount, appFavCount, appWantCount }) => {

    // sidebar state variables
    const [wantCount, setWantCount] = useState(0);
    const [readCount, setReadCount] = useState(0);
    const [favCount, setFavCount] = useState(0);

    const [want, setWant] = useState([]);
    const [pinned, setPinned] = useState(false);
    let APIWant;

    // retrieve userID and accessToken from sessionStorage - retrieve private baseURL for private API endpoints
    let accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();

    // navigates to login, and then back to this location
    const navigate = useNavigate();
    const location = useLocation();

    const deleteFromRead = async (book) => {
        let readBook = await readAPIFunctions.getReadByIsbn13(axiosPrivate, book.isbn13, accessToken);
        const readBookID = readBook.data[0]._id;
        readAPIFunctions.deleteRead(axiosPrivate, readBookID, accessToken);
        let rCount = await (readCount - 1)
        setReadCount(rCount)

    };

    async function setInProgressToTrue(book) {
        console.log('book in progress: ', book)
        await wantToReadAPIFunctions.updateWantToRead(axiosPrivate, book._id, {
            inProgress: true
        }, accessToken);
    };

    async function setInProgressToFalse(book) {
        console.log('book not in progress: ', book);
        await wantToReadAPIFunctions.updateWantToRead(axiosPrivate, book._id, {
            inProgress: false
        }, accessToken);
    };

    function clickedInProgress(book, index) {
        console.log(book)
        if (book.inProgress === true) {
            book.inProgress = false;
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr)
            setInProgressToFalse(book)
        } else {
            book.inProgress = true;
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr);
            setInProgressToTrue(book)
        }
    }

    async function addToRead(book) {
        await readAPIFunctions.saveRead(axiosPrivate, {
            title: book.title,
            authors: book.authors,
            description: book.description,
            imageLink: book.imageLink,
            infoLink: book.infoLink,
            isbn13: book.isbn13,
            user_id: userID
        }, accessToken);
        console.log('added to read books!')
        removeFromWantToRead(book);
        let rCount = await (readCount + 1);
        setReadCount(rCount)
    };

    async function clickedRead(book, index) {
        if (book.read === true) {
            book.read = false
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr);
            deleteFromRead(book);
        } else {
            book.read = true;
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr);
            addToRead(book);
        };
    };

    async function removeFromWantToRead(book) {
        await wantToReadAPIFunctions.deleteWantToRead(axiosPrivate, book._id, accessToken);
        setWant(want.filter(item => item._id !== book._id));
        let wCount = await (wantCount - 1)
        setWantCount(wCount)
    };

    async function loadRead() {
        let result = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
        let APIRead = result.data;
        let rCount = APIRead.length;
        setReadCount(rCount); 
    };

    async function loadFav() {
        let result = await favAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);
        let APIFav = result.data;
        let fCount = APIFav.length;
        setFavCount(fCount);
    };

    async function loadWant() {
        try {
            let result = await wantToReadAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
            APIWant = result.data;
            let wCount = await APIWant.length
            setWantCount(wCount);
            setWant(APIWant);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location}, replace: true });
        };
    };

    useEffect(() => {
        appReadCount(readCount)
    }, [readCount]);

    useEffect(() => {
        appFavCount(favCount)
    }, [favCount]);

    useEffect(() => {
        appWantCount(wantCount)
    }, [wantCount]);

    useEffect(() => {
            loadRead();
            loadFav();
            loadWant();
    }, []);

    return (
        <div>
            <h3>Books I want to read</h3>
            <div className={pinned ? 'single-book-header sticky' : 'single-book-header'}>
                <FontAwesomeIcon
                    icon={faThumbtack}
                    className={pinned ? 'pinned' : 'not-pinned'}
                    onClick={() => {
                        if (pinned === false) {
                            setPinned(true);
                        } else {
                            setPinned(false);
                        }
                    }}
                />
                <div className='heading-container-header'>
                    <p>In Progress</p>
                    <p>Complete</p>
                    <p>Remove</p>
                </div>
            </div>
            <div>
                {want.map((book, index) => (
                    <div key={book._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book?.title}</p>
                                <p>{book?.authors}</p>
                                <a href={book?.infoLink} className='book-link'>Buy me!</a>

                            </div>
                            <div className='button-container'>
                                {book.inProgress === true ?
                                    <button
                                        style={{ 'backgroundColor': 'green' }}
                                        onClick={() => {
                                            clickedInProgress(book, index)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faBookOpen}
                                            className='fa-2x' />
                                    </button>
                                    :
                                    <button
                                        onClick={() => {
                                            clickedInProgress(book, index)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faBook}
                                            className='fa-2x' />
                                    </button>

                                }
                                {book.read === true ?
                                    <button
                                        style={{ 'backgroundColor': 'green' }}
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className='fa-2x' />
                                    </button> :
                                    <button
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className='fa-2x' />
                                    </button>
                                }
                                <button
                                    onClick={() => {
                                        removeFromWantToRead(book);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className='fa-2x' />
                                </button>
                            </div>
                        </div>
                        <div className='content-container'>
                            <img src={book?.imageLink} className='book-content' />
                            <p className='book-content'>{book?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default WantToReadPage;