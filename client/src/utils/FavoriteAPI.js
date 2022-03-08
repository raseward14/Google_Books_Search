import axios from 'axios';

// get all favorites by user_id
const getFavorites = (userID) => {
    return axios.get('/api/favorite?user_id=' + userID);
};

// save a new favorite
// favorites are title, authors, image, description
// date and user_id will be set already
const saveFavorite = (bookInfo) => {
    return axios.post('/api/favorite', bookInfo);
};

const deleteFavorite = (bookID) => {
    return axios.delete('/api/favorite/' + bookID);
};

export { getFavorites, saveFavorite, deleteFavorite };