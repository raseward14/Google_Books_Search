import React, { useState, useEffect, useRef } from 'react';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
import * as wantAPIFunctions from '../utils/WantToReadAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
// tooltip
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from "react-tooltip";

import Rating from '../components/Rating';
// search
import Search from '../components/Search';

// import flatpickr.js
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

// import dropdown arrow
import Dropdown from '../components/Dropdown';


const LibraryPage = ({ appReadCount, appWantCount, appFavCount }) => {

    // sidebar state variables
    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    const [favCount, setFavCount] = useState(null);
    const [searchArray, setSearchArray] = useState(null);
    const [datePicker, setDatePicker] = useState(false);

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

    // datepicker useRef
    const fp = useRef(null);
    const sharedOptions = {
        mode: "multiple",
        dateFormat: "Y-m-d"
    }

    async function showDatePicker(selectedDates, dateStr, instance, id) {
        // if (datePicker) {
        //     setDatePicker(false);
        // } else {
        //     setDatePicker(true);
        // }

        // const fp = Flatpickr(`my-date-picker-${index}`, {
        //     mode: "multiple",
        //     dateFormat: "Y-m-d"
        // })
        // const fp = useRef(null);
        console.log('here', selectedDates, dateStr, instance);
        let dateArray = dateStr.split(',')
        let datesRead = [];
        // datesRead.push(dateStr);
        await dateArray.forEach(date => { 
            let newDate = date.trim();
            datesRead.push(newDate);
        });
        console.log(datesRead);
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: datesRead
        }, accessToken)
    }

    async function filterBooks(filteredArray) {
        console.log('want to read page has this book array: ', filteredArray)
        setRead(filteredArray);
    }

    async function updateFavoriteRating(id, value) {
        // update this on the favorites page, so we need to PUT the corresponding favorites rating
        // the body needs a "rating": value
        // the params need an ID
        console.log('updating this favorite: ', id, value)

        let result = await favoriteAPIFunctions.updateFavorite(axiosPrivate, id, { "rating": value }, accessToken);
        console.log(result.data)
    }

    async function updateRating(value, index) {
        console.log('new value: ', value)
        console.log(`books ID: ${read[index]._id}`)
        let result = await readAPIFunctions.updateRead(axiosPrivate, read[index]._id, { "rating": value }, accessToken);
        let favResult = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);

        let favoriteToUpdate = await favResult.data.filter(book => book.isbn13 === result.data.isbn13);
        if (favoriteToUpdate.length > 0) {
            updateFavoriteRating(favoriteToUpdate[0]._id, value);
        }
    }

    async function postRating(value, index) {
        let updatedBook = read[index];
        updatedBook.rating = value;
        let newArr = [...read];
        newArr[index] = updatedBook;
        setRead(newArr);
        updateRating(value, index)
    }

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
            user_id: userID,
            rating: book.rating
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
            setSearchArray(APIRead);
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
            <ReactTooltip id="calTip" />
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
                <Search
                    bookArray={searchArray}
                    className="single-book-header"
                    callback={filterBooks} />

                <div className='heading-container-header'>
                    <p>Favorite{"\n"}
                        <FontAwesomeIcon
                            className="fav"
                            icon={icon({ name: "heart", style: "solid" })} />
                    </p>
                    <p>Remove{"\n"}
                        <FontAwesomeIcon
                            icon={icon({ name: "trash-can", style: "regular" })} />
                    </p>
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
                            </div>
                            <div className='rating-container'>
                                    <p className='dates-read'>Dates Read<Dropdown /></p>
                                    
                                <div className="date-picker" id={`my-date-picker-${index}`}>
                                    <Flatpickr 
                                    placeholder="Select Date.."
                                    className='flatpickr'
                                    options={sharedOptions}
                                    ref={fp}
                                    onChange={(selectedDates, dateStr, instance, index) => {
                                        let id = book._id
                                        showDatePicker(selectedDates, dateStr, instance, id)
                                    }} />
                                    {/* <button
                                        data-clear
                                        type="button"
                                        onClick={() => {
                                            if (!fp?.current?.flatpickr) return;
                                            fp.current.flatpickr.clear();
                                        }}
                                    >
                                        Clear
                                    </button> */}
                                </div>
                                <Rating
                                    rating={book.rating}
                                    updateRating={postRating}
                                    index={index} />
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
                                    className="book-button"
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