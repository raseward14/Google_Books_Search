import React, { useEffect, useState } from 'react';
import * as favoriteAPIFunctions from'../utils/FavoriteAPI';

const FavoritesPage = () => {

    const [favorites, setFavorites] = useState([]);
    const bookshelf = document.getElementById('bookshelf');

    const printFavorites = (favoritesArray) => {

    }

    useEffect(() => {
        // re-load favorites after comment is posted
        if(favorites !== null) {
            bookshelf.innerHTML = null;
            printFavorites(favorites);
        }
    }, [favorites])

    useEffect(() => {
        // load your favorites on page load
        favoriteAPIFunctions.getFavorites()
        .then((res) => {
            let favoritesArray = res.data;
            setFavorites(favoritesArray);
        })
        console.log(yourFavorites)
    });

    return (
        <>
            <p>Favorites</p>
        </>
    );
};
export default FavoritesPage;