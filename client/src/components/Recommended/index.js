import React, { useState, useEffect } from "react";
import './style.css';
import * as favoriteAPIFunctions from '../../utils/FavoriteAPI';
import * as readAPIFunctions from '../../utils/ReadAPI';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Recommended = () => {

    const [subject, setSubject] = useState('');
    const [author, setAuthor] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [read, setRead] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');

    const loadRead = async () => {
        const readBooks = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
        const readAPI = await readBooks.data;
        setRead(readAPI);
    };

    const mostUsedInArray = (array) => {
        console.log('I received this array: ', array)
        return array.sort((a, b) =>
            array.filter(v => v === a).length
            - array.filter(v => v === b).length
        ).pop();
    };

    const loadFavorites = async () => {
        // retrieve the users fav's
        const favBooks = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);
        const favAPI = await favBooks.data

        // push authors inot a new array
        let authorArray = [];
        for (var i = 0; i < favAPI.length; ++i) {
            authorArray.push(favAPI[i].authors[0])
        };
        // call our mostUsedInArray function to find the most used author
        let favAuthor = await mostUsedInArray(authorArray);
        setAuthor(favAuthor);
        console.log('fav author: ', favAuthor)

        // right now, I dont store the subject of my favorites - fixed! should be able to pick back up here next time
        let subjectArray = [];
        for (var i = 0; i < favAPI.length; ++i) {
            subjectArray.push(favAPI[i].subject)
        };
        // call our mostUsedinArray function to find the most used subject
        let favSubject = await mostUsedInArray(subjectArray);
        setSubject(favSubject);
        console.log('fav subject: ', favSubject)
    };

    const checkIfRead = async (suggestionsArray) => {
        const readBooks = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
        const readAPI = await readBooks.data;
        const readTitles = await readAPI.map(book => book.title)
        let unreadSuggestions = [];
        await suggestionsArray.forEach((book) => {
            console.log('titles', book?.volumeInfo?.title)
            if (readTitles.includes(book?.volumeInfo?.title)) {
                console.log('already read')
            } else {
                console.log('not read')
                unreadSuggestions.push(book)
            }
        });
        console.log('unread suggestions: ', unreadSuggestions)
        setSuggestions(unreadSuggestions);
    }

    const loadSuggestions = async (author, subject) => {
        if (author !== '' && subject !== '') {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:"${subject}",inauthor:"${author}"`)
            const suggestions = await response.json();
            const suggestionsArray = suggestions.items;
            checkIfRead(suggestionsArray);
            console.log('your suggestions: ', suggestionsArray)
            // setSuggestions(suggestionsArray)
        };
    };

    // when author, and subject both have values, call loadSuggestions to send api request
    useEffect(() => {
        loadSuggestions(author, subject);
    }, [author, subject]);

    // empty dependency array, run once on page load, retrieve favorite API data
    useEffect(() => {
        loadFavorites();
        loadRead();
    }, []);

    return (
        <div>
            {suggestions.length > 0 && (
                <div>
                    {suggestions.map((book, index) =>
                        <td key={index} className="recommended-box book-card" >
                            <p style={{ color: "white" }}>{book?.volumeInfo.title}</p>
                            <img src={book.volumeInfo?.imageLinks?.thumbnail} className="fade"></img>
                        </td>
                    )}
                </div>
            )}
        </div>
    );
};
export default Recommended;