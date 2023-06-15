import React, { useState, useEffect, useRef } from 'react';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
import * as wantAPIFunctions from '../utils/WantToReadAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faTrashCan, faThumbtack, faHeart } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
// tooltip
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from "react-tooltip";

import Rating from '../components/Rating';


const LibraryPage = ({ appReadCount, appWantCount, appFavCount }) => {

    // sidebar state variables
    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    const [favCount, setFavCount] = useState(null);

    const [read, setRead] = useState([]);
    const [pinned, setPinned] = useState(false);
    let APIRead;

    // retrieve userID and accessToken from sessionStorage - retrieve baseURL for private API endpoints
    let accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();

    // navigate to login, and then back to this location
    const navigate = useNavigate();
    const location = useLocation();

    async function deleteFromFavorites(book) {
        let result = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);
        let APIFavorites = result.data
        let suspects = APIFavorites.filter(favorite => favorite.title === book.title)
        suspects.map(suspect => {
            favoriteAPIFunctions.deleteFavorite(axiosPrivate, suspect._id, accessToken);
        });
        console.log('suspects', suspects)
        if (suspects.length > 0 && favCount > 0) {
            let fCount = await (favCount - 1);
            setFavCount(fCount);
        } else {
            return
        }
    };

    async function unFavoriteBook(book, index) {
        let response = await readAPIFunctions.updateRead(axiosPrivate, book._id, { "favorited": "false" }, accessToken);
        let newArr = [...read];
        newArr[index] = response.data;
        setRead(newArr);
        // now delete it from the favorites
        deleteFromFavorites(book);
    };

    async function removeFromRead(book) {
        book.read = false;
        await readAPIFunctions.deleteRead(axiosPrivate, book._id, accessToken);
        setRead(read.filter(read => read._id !== book._id))
        let rCount = await (readCount - 1);
        setReadCount(rCount)
        deleteFromFavorites(book);
    };

    async function postFavorite(book) {
        await favoriteAPIFunctions.saveFavorite(axiosPrivate, {
            title: book.title,
            authors: book.authors,
            description: book.description,
            imageLink: book.imageLink,
            subject: book.subject,
            infoLink: book.infoLink,
            isbn13: book.isbn13,
            user_id: userID
        }, accessToken);
        // IF its not already in favorites
        // if .title === .title of the book we are favoriting
        // 'oops! looks like a book with this title has already been favorited!'
        // click here to keep both
        // click here to replace that book with this one
        let fCount = await (favCount + 1);
        setFavCount(fCount)
    };


    async function favoriteBook(book, index) {
        let response = await readAPIFunctions.updateRead(axiosPrivate, book._id, { "favorited": "true" }, accessToken);
        let newArr = [...read];
        newArr[index] = response.data;
        setRead(newArr);
        // POST to favorites 
        postFavorite(book);
    };


    async function loadWant() {
        // on page load, set want count
        let result = await wantAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
        let wCount = result.data.length;
        setWantCount(wCount);
    };

    async function loadFav() {
        // on page load, set fav count
        let result = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);
        let fCount = result.data.length;
        setFavCount(fCount);
        return result.data;
    };

    async function loadRead() {
        try {
            let read = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
            APIRead = read.data;
            let rCount = await APIRead.length;
            setReadCount(rCount);
            setRead(APIRead);
            console.log('read books: ', APIRead)
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
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
        loadFav();
        loadWant();
        loadRead();
    }, []);


    return (
        <div>
            <h3>Library of books I've read.</h3>
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
                            setPinned(false)
                        };
                    }}
                />
                <div className='heading-container-header'>
                    <p>Favorite</p>
                    <p>Remove</p>
                </div>
            </div>
            <div>
                {read.map((book, index) => (
                    <div key={book._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book.title}</p>
                                <p>{book.authors}</p>
                                <a href={book.infoLink} className='book-link'>Buy me!</a>
                                <Rating
                                    book={book} />
                            </div>
                            <div className='button-container'>
                                {book.favorited === true ?
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            unFavoriteBook(book, index);
                                        }}
                                        className="heart-icon fav"
                                        icon={icon({ name: "heart", style: "solid" })} />
                                    :
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            favoriteBook(book, index);
                                        }}
                                        className="heart-icon"
                                        icon={icon({ name: "heart", style: "regular" })} />
                                }

                                <FontAwesomeIcon
                                    className="trashcan"
                                    onClick={() => {
                                        removeFromRead(book);
                                    }}
                                    icon={icon({ name: "trash-can", style: "regular" })} />
                            </div>
                        </div>
                        {book.expand ?
                            <div className='content-container'>
                                <img src={book.imageLink} className='book-content' />
                                <p className='book-content'>{book.description}</p>
                            </div>
                            :
                            <div className='content-container fade shrink'>
                                <img src={book.imageLink} className='book-content' />
                                <p className='book-content'>{book.description}</p>
                            </div>
                        }
                        <div className='expand'
                            onClick={() => {
                                if (book.expand) {
                                    book.expand = false;
                                    let newArr = [...read];
                                    newArr[index] = book;
                                    setRead(newArr);
                                } else {
                                    book.expand = true;
                                    let newArr = [...read];
                                    newArr[index] = book;
                                    setRead(newArr);
                                }
                            }}
                        >Expand</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default LibraryPage;