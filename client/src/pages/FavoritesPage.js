import React, { useEffect, useState, useRef } from 'react';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as wantAPIFunctions from '../utils/WantToReadAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const FavoritesPage = ({ appReadCount, appFavCount, appWantCount }) => {

    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    const [favCount, setFavCount] = useState(null);

    const [favorites, setFavorites] = useState([]);
    let accessToken = sessionStorage.getItem('accessToken');
    let APIFavorites;
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const userID = sessionStorage.getItem('userID');
    
    async function deleteFavorite(book) {
        await favoriteAPIFunctions.deleteFavorite(axiosPrivate, book._id, accessToken);
        setFavorites(favorites.filter(fav => fav._id !== book._id))
        let fCount = await (favCount - 1);
        setFavCount(fCount);
        let result = await readAPIFunctions.getReadByIsbn13(axiosPrivate, book.isbn13, accessToken, userID)
        await readAPIFunctions.updateRead(axiosPrivate, result.data[0]._id, { "favorited": "false" }, accessToken);
    }

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
            console.log('favorites: ', favorites)
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
            <h3>Favorites</h3>
            <div>
                {favorites.map((favorite, index) => (
                    <div key={favorite._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{favorite.title}</p>
                                <p>{favorite.authors}</p>
                                <a href={favorite.infoLink} className='book-link'>Buy me!</a>
                            </div>
                            <div className='button-container'>
                                    <FontAwesomeIcon
                                                                        className="trashcan"

                                    onClick={() => {
                                        deleteFavorite(favorite)
                                    }}
                                        icon={icon({ name: "trash-can", style: "regular" })}/>
                            </div>
                        </div>
                        {favorite.expand ?
                            <div className='content-container'>
                                <img src={favorite.imageLink} className='book-content' />
                                <p className='book-content'>{favorite.description}</p>
                            </div>
                            :
                            <div className='content-container fade shrink'>
                                <img src={favorite.imageLink} className='book-content' />
                                <p className='book-content'>{favorite.description}</p>
                            </div>
                        }
                        <div className='expand'
                            onClick={() => {
                                if (favorite.expand) {
                                    favorite.expand = false;
                                    let newArr = [...favorites];
                                    newArr[index] = favorite;
                                    setFavorites(newArr);
                                } else {
                                    favorite.expand = true;
                                    let newArr = [...favorites];
                                    newArr[index] = favorite;
                                    setFavorites(newArr)
                                }
                            }}>Expand</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;