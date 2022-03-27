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

const deleteWantToRead = (bookID) => {
    return axios.delete('/api/read' + bookID);
};

export { getWantToRead, saveWantToRead, deleteWantToRead };