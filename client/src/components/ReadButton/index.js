import React, { useState, useEffect } from "react";
// API calls - axiosPrivate for auth'd calls
import * as readAPIFunctions from '../../utils/ReadAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faSquareCheck, faBook, faQuestion, faThumbtack } from '@fortawesome/free-solid-svg-icons';

const ReadButton = (suggestionsArray, book, index, { appReadCount, suggestionsArrayCallback }) => {

    // navBar count state variables
    const [readCount, setReadCount] = useState(null);
    const [newSuggestionsArray, setNewSuggestionsArray] = useState([]);
    const [book, setBook] = useState(book);

    // to auth API calls
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();

    // add to read books, update count
    async function addToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;

        readAPIFunctions.saveRead(axiosPrivate, {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            subject: book.volumeInfo.categories[0],
            infoLink: book.volumeInfo.infoLink,
            isbn13: thisIsbn13,
            user_id: userID
        }, accessToken);
        let rCount = await (readCount + 1);
        setReadCount(rCount);
    };

    // remove from the suggestions array - flip .read to true
    function clickedRead(book, index) {
        book.read = true;
        let newArr = [...suggestionsArray];
        delete newArr[index];
        setBook(book);
        setSuggestionsArray(newArr);
    }

    useEffect(() => {
        suggestionsArrayCallback(newSuggestionsArray)
    }, [newSuggestionsArray])

    useEffect(() => {
        appReadCount(readCount);
    }, [readCount]);

    return (
        <div>
            {book.read === true ?
                <button
                    style={{ "backgroundColor": "green" }}
                    onClick={() => {
                        clickedRead(book, index)
                    }}>
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        className='fa-2x'
                    />
                </button>
                : <button
                    onClick={() => {
                        clickedRead(book, index)
                    }}>
                    <FontAwesomeIcon
                        icon={faQuestion}
                        className='fa-2x'
                    />
                </button>
            }
        </div>
    )
};

export default ReadButton;