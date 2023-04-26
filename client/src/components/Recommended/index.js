import React, { useState, useEffect } from "react";
import './style.css';
import * as favoriteAPIFunctions from '../../utils/FavoriteAPI';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Recommended = () => {

    const [subject, setSubject] = useState('');
    const [author, setAuthor] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');

    const mostUsedInArray = (array) => {
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
        for (var i = 0; i<favAPI.length; ++i) {
            authorArray.push(favAPI[i].authors[0])
        };

        // right now, I dont store the subject of my favorites
        // let subjectArray = [];
        // for (var i=0; i<favAPI.length; ++i) {
        //     subjectArray.push(favAPI[i].)
        // }
        // call our mostUsedInArray function to extract which author appears the most
        let favAuthor = await mostUsedInArray(authorArray);
        setAuthor(favAuthor);
        console.log('fav author; ', favAuthor)
    };

    const loadSuggestions = async (author, subject) => {
        if (author !== '' && subject !== '') {
            // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:"${subject}",inauthor:"${author}"`)
            // const suggestions = response.json();
            // const suggestionsArray = suggestions.items;

            // const testBookSubjectArray = response[0].volumeInfo.categories
            // console.log(testBookSubjectArray);
        }
    }

    // when author, and subject both have values, call loadSuggestions to send api request
    useEffect(() => {
        loadSuggestions(author, subject);
    }, [author, subject]);

    // empty dependency array, run once on page load, retrieve favorite API data
    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <div className="recommended-box">
        </div>
    );
};
export default Recommended;