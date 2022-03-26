import axios from 'axios';

// get books to read, eventually by user_id
const getRead = () => {
    return axios.get('/api/read');

};

// save a new book to read
// books are title, authors, description, imageLink, infoLink
const saveRead = (bookInfo) => {
    return axios.post('/api/read', bookInfo);
};

const deleteRead = (bookID) => {
    return axios.delete('/api/read' + bookID);
};

export { getRead, saveRead, deleteRead };