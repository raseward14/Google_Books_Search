import React, { useEffect, useState } from 'react';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";


const FavoritesPage = () => {

    const [favorites, setFavorites] = useState([]);
    let accessToken = sessionStorage.getItem('accessToken');
    let APIFavorites;
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    async function loadFavorites() {
        try {
            let result = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken);
            APIFavorites = result.data;
            console.log(APIFavorites)
            setFavorites(APIFavorites);
        } catch(err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true })
        }
    };

    useEffect(() => {
        loadFavorites()
    }, [])

    return (
        <div>
            <p>Favorites</p>
            <div>
                {favorites.length > 0 && (
                    <div>
                        {favorites.map((favorite) => (
                            <div key={favorite._id} className='single-book'>
                                <div className='heading-container'>
                                    <div>
                                        <p>{favorite.title}</p>
                                        <p>{favorite.authors}</p>
                                        <a href={favorite.infoLink} className='book-link'>Buy me!</a>
                                    </div>
                                </div>
                                <div className='content-container'>
                                    <img src={favorite.imageLink} className='book-content' />
                                    <p className='book-content'>{favorite.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;