import React, { useEffect, useState } from 'react';
import * as favoriteAPIFunctions from'../utils/FavoriteAPI';

const FavoritesPage = () => {

    const [favorites, setFavorites] = useState([]);
    const bookShelf = document.getElementById('bookshelf');
    let APIFavorites;

    async function loadFavorites() {
        let result = await favoriteAPIFunctions.getFavorites();
        APIFavorites = result.data;
        console.log(APIFavorites)
        setFavorites(APIFavorites);
    };

    useEffect(() => {
        loadFavorites()
    }, [])
        
    return (
        <div>
            <p>Favorites</p>
            <div id='bookshelf'>
                {favorites.length > 0 && (
                    <div>
                        {favorites.map((favorite) => (
                            <div key={favorite.id}>{favorite.title}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;