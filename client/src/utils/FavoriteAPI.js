import axios from 'axios';

// get all favorites by user_id
// const getFavorites = (userID) => {
//     return axios.get('/api/favorite?user_id=' + userID);
// }; 
const getFavorites = (accessToken) => {
        return axios.get('/api/favorite', {
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
const saveFavorite = (bookInfo, accessToken) => {
    return axios.post('/api/favorite', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

const deleteFavorite = (id, accessToken) => {
    return axios.delete(`/api/favorite/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

export { getFavorites, saveFavorite, deleteFavorite };