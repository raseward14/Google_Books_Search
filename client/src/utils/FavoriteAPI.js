// import axios from 'axios';

import { axiosPrivate } from "../api/axios";

// get all favorites by user_id
// const getFavorites = (userID) => {
//     return axios.get('/api/favorite?user_id=' + userID);
// }; 
const getFavorites = (axiosPrivate, accessToken, userID) => {
        return axiosPrivate.get(`/api/favorite?user_id=${userID}`, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
};

const getfavoriteByIsbn13 = (axiosPrivate, userID, isbn13, accessToken) => {
    return axiosPrivate.get(`/api/favorite/?user_id=${userID}&isbn13=${isbn13}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// save a new favorite
// favorites are title, authors, image, link, description
// date and user_id will be set already
const saveFavorite = (axiosPrivate, bookInfo, accessToken) => {
    return axiosPrivate.post('/api/favorite', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// update a favorite
// this would be to rate a favorite
const updateFavorite = (axiosPrivate, id, body, accessToken) => {
    return axiosPrivate.put(`/api/favorite/${id}`, body, {
        headers: {
            Authorization: 'Bearer: ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

const deleteFavorite = (axiosPrivate, id, accessToken) => {
    return axiosPrivate.delete(`/api/favorite/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

export { getFavorites, saveFavorite, deleteFavorite, getfavoriteByIsbn13, updateFavorite };