import React, { useEffect, useState, useRef } from 'react';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as wantAPIFunctions from '../utils/WantToReadAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import Rating from '../components/Rating';

// tooltip
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from "react-tooltip";
// search
import Search from '../components/Search';

const FavoritesPage = ({ appReadCount, appFavCount, appWantCount }) => {

    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    const [favCount, setFavCount] = useState(null);
    const [pinned, setPinned] = useState(false);
    const [searchArray, setSearchArray] = useState(null);

    const [favorites, setFavorites] = useState([]);
    let accessToken = sessionStorage.getItem('accessToken');
    let APIFavorites;
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const userID = sessionStorage.getItem('userID');

    async function filterBooks(filteredArray) {
        console.log('want to read page has this book array: ', filteredArray)
        setFavorites(filteredArray);
    }

    async function updateReadRating(id, value) {
        // update this on the read page, so we need to PUT the corresponding read rating
        // the body needs a "rating": value
        // the params need an ID
        console.log('updating this read: ', id, value);

        let result = await readAPIFunctions.updateRead(axiosPrivate, id, { "rating": value }, accessToken);
        console.log(result.data);

    };

    async function updateRating(value, index) {
        console.log('new value: ', value);
        console.log(`books ID: ${favorites[index]._id}`);
        let result = await favoriteAPIFunctions.updateFavorite(axiosPrivate, favorites[index]._id, { "rating": value }, accessToken);
        let readResult = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);

        let readToUpdate = await readResult.data.filter(book => book.isbn13 === result.data.isbn13);
        if (readToUpdate.length > 0) {
            updateReadRating(readToUpdate[0]._id, value);
        };
    }

    async function postRating(value, index) {
        let updatedFavorite = favorites[index]
        updatedFavorite.rating = value
        let newArr = [...favorites];
        newArr[index] = updatedFavorite;
        setFavorites(newArr);
        updateRating(value, index)
    }

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
            setSearchArray(APIFavorites);
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
            <ReactTooltip id="pinTip" />

            <div className={pinned ? 'single-book-header sticky' : 'single-book-header'}>
                <FontAwesomeIcon
                    data-tooltip-id="pinTip"
                    data-tooltip-content="Pin this header!"

                    icon={faThumbtack}
                    className={pinned ? 'pin pinned' : 'pin not-pinned'}
                    onClick={() => {
                        if (pinned === false) {
                            setPinned(true);
                        } else {
                            setPinned(false);
                        }
                    }}
                />
                <Search 
                bookArray={searchArray}
                className="single-book-header"
                callback={filterBooks} />

                <div className='heading-container-header'>
                    <p>Remove{"\n"}
                        <FontAwesomeIcon
                            icon={icon({ name: "trash-can", style: "regular" })} />
                    </p>
                </div>
            </div>


            <div>
                {favorites.map((favorite, index) => (
                    <div key={favorite._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{favorite.title}</p>
                                <p>{favorite.authors}</p>
                                <a href={favorite.infoLink} className='book-link'>Buy me!</a>
                            </div>
                            <div className='rating-container'>
                                <Rating
                                    rating={favorite.rating}
                                    updateRating={postRating}
                                    index={index} />

                            </div>
                            <div className='button-container'>
                                <FontAwesomeIcon
                                    className="book-button"

                                    onClick={() => {
                                        deleteFavorite(favorite)
                                    }}
                                    icon={icon({ name: "trash-can", style: "regular" })} />
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