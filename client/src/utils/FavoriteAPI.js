// import axios from 'axios';

// get all favorites by user_id
// const getFavorites = (userID) => {
//     return axios.get('/api/favorite?user_id=' + userID);
// }; 
const getFavorites = (axiosPrivate, accessToken) => {
        return axiosPrivate.get('/api/favorite', {
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

const deleteFavorite = (axiosPrivate, id, accessToken) => {
    return axiosPrivate.delete(`/api/favorite/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

export { getFavorites, saveFavorite, deleteFavorite };