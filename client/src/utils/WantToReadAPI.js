import axios from 'axios';

// get books to read, eventually by user_id
const getWantToRead = () => {
    return axios.get('/api/read');

};

// save a new book to read
// books are title, authors, description, imageLink, infoLink
const saveWantToRead = (bookInfo) => {
    return axios.post('/api/read', bookInfo);
};

const deleteWantToRead = (id) => {
    return axios.delete(`/api/read/${id}`);
};

export { getWantToRead, saveWantToRead, deleteWantToRead };