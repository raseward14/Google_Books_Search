import axios from 'axios';

// get all favorites by user_id
// const getFavorites = (userID) => {
//     return axios.get('/api/favorite?user_id=' + userID);
// };
const getFavorites = () => {
        return axios.get('/api/favorite');
};
    

// save a new favorite
// favorites are title, authors, image, link, description
// date and user_id will be set already
const saveFavorite = (bookInfo) => {
    return axios.post('/api/favorite', bookInfo);
};

const deleteFavorite = (id) => {
    return axios.delete(`/api/favorite/${id}`);
};

export { getFavorites, saveFavorite, deleteFavorite };