import React, { useState, useEffect } from "react";
// API calls - axiosPrivate for auth'd calls
import * as readAPIFunctions from '../../utils/ReadAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faSquareCheck, faBook, faQuestion, faThumbtack } from '@fortawesome/free-solid-svg-icons';

const ReadButton = (book, { appReadCount }) => {

    // navBar count state variables
    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    const [favCount, setFavCount] = useState(null);

    // to auth API calls
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();

    async function addToRead(book, index) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;

        if (book.want === true) {
            book.want = false;
            let newArr = [...books]
            newArr[index] = book;
            setBooks(newArr)
            deleteFromWant(book)
        }
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

    return (
        <div>

        </div>
    )
};

export default ReadButton;