import React, { useState, useEffect } from "react";
import './style.css';
import * as favoriteAPIFunctions from '../../utils/FavoriteAPI';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Recommended = () => {

    const [subject, setSubject] = useState();
    const [author, setAuthor] = useState();
    const axiosPrivate = useAxiosPrivate();
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');

    const mostUsedInArray = (array) => {
        return array.sort((a, b) =>
            array.filter(v => v === a).length
            - array.filter(v => v === b).length
        ).pop();
    }

    const loadSuggestions = async () => {

        const favBooks = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);
        const favAPI = favBooks.data
        // use .map to create a new array from the favAPI array, for each element, only grab the authors
        let authorArray = await favAPI.map(object => object.authors)
        // call our mostUsedInArray function to extract which author appears the most
        console.log('author array', authorArray)
        let favAuthor = mostUsedInArray(authorArray);


        // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:"${subject}",inauthor:"${author}"`)
        // const suggestions = response.json();
        // const suggestionsArray = suggestions.items;

        console.log('fav author; ', favAuthor)

    }

    // on page load, call loadSuggestions to load prior search, and add .read, .want properties 
    useEffect(() => {
        loadSuggestions();
    }, [])

    // const testBookSubjectArray = response[0].volumeInfo.categories
    // console.log(testBookSubjectArray);

    return (
        <div className="recommended-box">
        </div>
    );
};
export default Recommended;