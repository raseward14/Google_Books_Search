import React, { useState, useEffect } from "react";
import './style.css';
import * as favoriteAPIFunctions from '../../utils/FavoriteAPI';
import * as readAPIFunctions from '../../utils/ReadAPI';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const stringSimilarity = require('string-similarity');


const Recommended = () => {

    const [subject, setSubject] = useState('');
    const [author, setAuthor] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');

    const mostUsedInArray = (array) => {
        console.log('I received this array: ', array)
        return array.sort((a, b) =>
            array.filter(v => stringSimilarity.compareTwoStrings(v, a) > 0.5).length
            - array.filter(v => stringSimilarity.compareTwoStrings(v, b) > 0.5).length
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
        }

        console.log('author array', authorArray)
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
            // "" to search for exact phrases, enclose in quotations marks - removing from author - that did it - David B Wong now returns books
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:"${subject}",inauthor:${author}`)
            const suggestions = await response.json();
            const suggestionsArray = suggestions.items;
            // your suggestions is undefined bc inauthor='David B Wong',subject='Fiction' doesn't return any results
            if(suggestionsArray !== undefined) {
                checkIfRead(suggestionsArray);
            } else {

            }
            console.log('your suggestions: ', suggestionsArray)
        };
    };

    // when author, and subject both have values, call loadSuggestions to send api request
    useEffect(() => {
        loadSuggestions(author, subject);
    }, [author, subject]);

    // empty dependency array, run once on page load, retrieve favorite API data
    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <div>
            {suggestions.length > 0 ?
                <div>
                    {suggestions.length > 0 && (
                        suggestions.map((book, index) =>
                            <td key={index} className="recommended-box book-card" >
                                <p style={{ color: "white" }}>{book?.volumeInfo.title}</p>
                                <img src={book.volumeInfo?.imageLinks?.thumbnail} className="fade"></img>
                            </td>
                        )
                    )}
                </div>
                :
                <div>Favorite a few books, to view suggestions here!</div>
            }
        </div>
    );
};
export default Recommended;