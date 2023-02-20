import React, { useEffect, useState, useRef } from 'react';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as wantAPIFunctions from '../utils/WantToReadAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";


const FavoritesPage = ({ appReadCount, appFavCount, appWantCount }) => {

    const [readCount, setReadCount] = useState(0);
    const [wantCount, setWantCount] = useState(0);
    const [favCount, setFavCount] = useState(0);

    const [favorites, setFavorites] = useState([]);
    let accessToken = sessionStorage.getItem('accessToken');
    let APIFavorites;
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const userID = sessionStorage.getItem('userID');

    async function loadRead() {
        let result = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
        let rCount = result.data.length;
        setReadCount(rCount)

    }

    async function loadWant() {
        let result = await wantAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
        let wCount = result.data.length;
        setWantCount(wCount);
    }

    async function loadFavorites() {
        try {
            let result = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID);
            APIFavorites = result.data;
            let fCount = result.data.length;
            setFavCount(fCount);
            setFavorites(APIFavorites);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true })
        }
    };

    useEffect(() => {
        appReadCount(readCount)
    }, [readCount]);

    useEffect(() => {
        appWantCount(wantCount)
    }, [wantCount]);

    useEffect(() => {
        appFavCount(favCount)
    }, [favCount]);

    useEffect(() => {
        loadWant();
        loadRead();
        loadFavorites();
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