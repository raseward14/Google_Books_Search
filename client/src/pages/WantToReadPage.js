import React, { useState, useEffect, useRef } from 'react';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as favAPIFunctions from '../utils/FavoriteAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

// tooltip
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from "react-tooltip";
// search
import Search from '../components/Search';

const WantToReadPage = ({ appReadCount, appFavCount, appWantCount }) => {

    // sidebar state variables
    const [wantCount, setWantCount] = useState(null);
    const [readCount, setReadCount] = useState(null);
    const [favCount, setFavCount] = useState(null);

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

    async function filterBooks(filteredArray) {
        console.log('want to read page has this book array: ', filteredArray)
    }

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
            subject: book.subject,
            infoLink: book.infoLink,
            isbn13: book.isbn13,
            user_id: userID
        }, accessToken);
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
            book.want = false;
            console.log('completed!', book)
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
            let wCount = await APIWant.length;
            setWantCount(wCount);
            setWant(APIWant);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        };
    };

    useEffect(() => {
        appReadCount(readCount);
    }, [readCount]);

    useEffect(() => {
        appFavCount(favCount);
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
            <ReactTooltip id="pinTip" />

            <div className={pinned ? 'single-book-header sticky' : 'single-book-header'}>
                <FontAwesomeIcon
                    data-tooltip-id="pinTip"
                    data-tooltip-content="Pin this header!"

                    icon={faThumbtack}
                    className={pinned ? 'pin pinned' : 'pin not-pinned'}
                    onClick={() => {
                        if (pinned === false) {
                            setPinned(true);
                        } else {
                            setPinned(false);
                        }
                    }}
                />
                <Search 
                bookArray={want}
                className="single-book-header"
                callback={filterBooks} />

                <div className='heading-container-header'>
                    <p>In Progress{"\n"}
                        <FontAwesomeIcon
                            icon={icon({ name: "book-open" })}
                            style={{ 'color': 'green' }} /></p>
                    <p>Complete{"\n"}
                        <FontAwesomeIcon
                            style={{ 'color': 'green' }}
                            icon={icon({ name: "circle-check" })} /></p>
                    <p>Remove{"\n"}
                        <FontAwesomeIcon
                            icon={icon({ name: "trash-can", style: "regular" })} />
                    </p>
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
                            <div className='rating-container'></div>
                            <div className='button-container'>
                                {book.inProgress === true ?
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            clickedInProgress(book, index)
                                        }}
                                        icon={icon({ name: "book-open" })}
                                        className='book-button'
                                        style={{ 'color': 'green' }} />
                                    :
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            clickedInProgress(book, index)
                                        }}
                                        icon={icon({ name: "book" })}
                                        className='book-button'
                                    />
                                }
                                {book.read === true ?
                                    <FontAwesomeIcon
                                        style={{ 'color': 'green' }}
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                        icon={icon({ name: "circle-check" })}
                                        className='book-button' />
                                    :
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                        icon={icon({ name: "circle", style: "regular" })}
                                        className='book-button' />
                                }
                                <FontAwesomeIcon
                                    onClick={() => {
                                        removeFromWantToRead(book);
                                    }}
                                    icon={icon({ name: "trash-can", style: "regular" })}
                                    className='book-button' />
                            </div>
                        </div>
                        {book.expand ?
                            <div className='content-container'>
                                <img src={book?.imageLink} className='book-content' />
                                <p className='book-content'>{book?.description}</p>
                            </div>
                            :
                            <div className='content-container fade shrink'>
                                <img src={book?.imageLink} className='book-content' />
                                <p className='book-content'>{book?.description}</p>
                            </div>
                        }
                        <div className='expand'
                            onClick={() => {
                                if (book.expand) {
                                    book.expand = false;
                                    let newArr = [...want];
                                    newArr[index] = book;
                                    setWant(newArr);
                                } else {
                                    book.expand = true;
                                    let newArr = [...want];
                                    newArr[index] = book
                                    setWant(newArr);
                                }
                            }}
                        >Expand</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default WantToReadPage;